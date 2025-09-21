import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { buildRecommendedDeck, calculateBalancedCardStats } from '../data/extendedWordData';

// ゲーム状態の初期値
const initialGameState = {
  // プレイヤー1（人間）
  player1: {
    hp: 50, // HPを50に調整
    maxHp: 50,
    deck: [],
    hand: [],
    field: [],
    graveyard: [],
    mana: 10, // 開始マナを10に調整
    maxMana: 10
  },
  // プレイヤー2（AI）
  player2: {
    hp: 50, // HPを50に調整
    maxHp: 50,
    deck: [],
    hand: [],
    field: [],
    graveyard: [],
    mana: 10, // 開始マナを10に調整
    maxMana: 10
  },
  // ゲーム状態
  currentTurn: 'player1',
  phase: 'draw', // draw, main, battle, end
  turnCount: 1,
  gameStatus: 'playing', // playing, player1Win, player2Win, draw
  selectedCard: null,
  targetCard: null,
  battleLog: [],
  // 学習関連
  correctAnswers: 0,
  totalQuestions: 0,
  learnedWords: new Set(),
  reviewWords: new Set(),
  // 攻撃制限（ターンごとにリセット）
  attackedCardsThisTurn: new Set() // カードIDのセット（削除予定）
};

// アクションタイプ
const GAME_ACTIONS = {
  INITIALIZE_GAME: 'INITIALIZE_GAME',
  DRAW_CARD: 'DRAW_CARD',
  PLAY_CARD: 'PLAY_CARD',
  ATTACK: 'ATTACK',
  END_TURN: 'END_TURN',
  NEXT_PHASE: 'NEXT_PHASE',
  SELECT_CARD: 'SELECT_CARD',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  UPDATE_HP: 'UPDATE_HP',
  ADD_TO_LOG: 'ADD_TO_LOG',
  RESET_GAME: 'RESET_GAME',
  RESET_ATTACKED_CARDS: 'RESET_ATTACKED_CARDS',
  GAIN_MANA: 'GAIN_MANA'
};

// ゲーム状態のリデューサー
const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.INITIALIZE_GAME:
      const player1Deck = buildRecommendedDeck(1); // プレイヤーレベル1
      const player2Deck = buildRecommendedDeck(1); // AIレベル1
      
      return {
        ...initialGameState,
        player1: {
          ...initialGameState.player1,
          deck: player1Deck.slice(5),
          hand: player1Deck.slice(0, 5)
        },
        player2: {
          ...initialGameState.player2,
          deck: player2Deck.slice(5),
          hand: player2Deck.slice(0, 5)
        }
      };

    case GAME_ACTIONS.DRAW_CARD:
      const currentPlayer = action.player;
      const player = state[currentPlayer];
      
      if (player.deck.length === 0) return state;
      
      const drawnCard = player.deck[0];
      const newDeck = player.deck.slice(1);
      const newHand = [...player.hand, drawnCard];
      
      return {
        ...state,
        [currentPlayer]: {
          ...player,
          deck: newDeck,
          hand: newHand
        }
      };

    case GAME_ACTIONS.PLAY_CARD:
      const { player: playingPlayer, cardIndex, isCorrect } = action;
      const playingPlayerState = state[playingPlayer];
      const cardToPlay = playingPlayerState.hand[cardIndex];
      
      if (!cardToPlay || playingPlayerState.mana < cardToPlay.cost) return state;
      
      // 正解の場合のみカードをプレイ
      if (isCorrect) {
        console.log("PLAY_CARD: Correct answer, playing card", cardToPlay);

        const newHand = playingPlayerState.hand.filter((_, index) => index !== cardIndex);
        const newField = [...playingPlayerState.field, cardToPlay];
        const newMana = playingPlayerState.mana - cardToPlay.cost;
        
        return {
          ...state,
          [playingPlayer]: {
            ...playingPlayerState,
            hand: newHand,
            field: newField,
            mana: newMana
          },
          battleLog: [...state.battleLog, `${cardToPlay.word}をプレイしました！`]
        };
      } else {
        // 不正解の場合、カードは手札から消え、マナは消費されない
        const newHand = playingPlayerState.hand.filter((_, index) => index !== cardIndex);
        return {
          ...state,
          [playingPlayer]: {
            ...playingPlayerState,
            hand: newHand,
          },
          battleLog: [...state.battleLog, `${cardToPlay.word}のクイズに失敗しました。カードは消滅します。`]
        };
      }

    case GAME_ACTIONS.ATTACK:
      const { attackingCard, defendingPlayer, defendingCardIndex } = action;
      const attackerPlayer = state[state.currentTurn];
      const defender = state[defendingPlayer];
      
      let damage = attackingCard.attack;
      let newDefenderState = { ...defender };
      let logMessage = "";
      let manaGained = 0;
      
      if (defendingCardIndex !== null && defender.field[defendingCardIndex]) {
        // カード対カードの戦闘
        const defendingCard = defender.field[defendingCardIndex];
        const netDamage = Math.max(0, attackingCard.attack - defendingCard.defense);
        
        if (netDamage > 0) {
          // 防御カードを破壊
          newDefenderState.field = defender.field.filter((_, index) => index !== defendingCardIndex);
          newDefenderState.graveyard = [...defender.graveyard, defendingCard];
          logMessage = `${attackingCard.word}が${defendingCard.word}を破壊しました！`;
          manaGained = netDamage; // 破壊したカードに与えたダメージ分マナ獲得
        } else {
          logMessage = `${defendingCard.word}が攻撃を防ぎました！`;
        }
      } else {
        // プレイヤーへの直接攻撃
        newDefenderState.hp = Math.max(0, defender.hp - damage);
        logMessage = `${attackingCard.word}で${damage}ダメージ！`;
        manaGained = damage; // プレイヤーに与えたダメージ分マナ獲得
      }
      
      // ゲーム終了判定
      let newGameStatus = state.gameStatus;
      if (newDefenderState.hp <= 0) {
        newGameStatus = defendingPlayer === 'player1' ? 'player2Win' : 'player1Win';
      }
      
      // 攻撃成功時のマナ増加
      const newAttackerMana = Math.min(attackerPlayer.maxMana, attackerPlayer.mana + manaGained);

      return {
        ...state,
        [state.currentTurn]: {
          ...attackerPlayer,
          mana: newAttackerMana
        },
        [defendingPlayer]: newDefenderState,
        gameStatus: newGameStatus,
        battleLog: [...state.battleLog, logMessage]
      };

    case GAME_ACTIONS.END_TURN:
      const nextPlayer = state.currentTurn === 'player1' ? 'player2' : 'player1';
      const nextTurnCount = nextPlayer === 'player1' ? state.turnCount + 1 : state.turnCount;
      
      // マナ回復
      const currentPlayerForMana = state[state.currentTurn];
      const newManaAmount = Math.min(currentPlayerForMana.maxMana, currentPlayerForMana.mana + 1);
      
      return {
        ...state,
        currentTurn: nextPlayer,
        turnCount: nextTurnCount,
        phase: 'draw',
        selectedCard: null,
        targetCard: null,
        [state.currentTurn]: {
          ...currentPlayerForMana,
          mana: newManaAmount
        }
      };

    case GAME_ACTIONS.NEXT_PHASE:
      const phases = ['draw', 'main', 'battle', 'end'];
      const currentPhaseIndex = phases.indexOf(state.phase);
      const nextPhase = phases[(currentPhaseIndex + 1) % phases.length];
      
      return {
        ...state,
        phase: nextPhase
      };

    case GAME_ACTIONS.SELECT_CARD:
      return {
        ...state,
        selectedCard: action.card
      };

    case GAME_ACTIONS.ANSWER_QUESTION:
      const { correct, wordId } = action;
      const newLearnedWords = new Set(state.learnedWords);
      const newReviewWords = new Set(state.reviewWords);
      
      if (correct) {
        newLearnedWords.add(wordId);
      } else {
        newReviewWords.add(wordId);
      }
      
      return {
        ...state,
        correctAnswers: state.correctAnswers + (correct ? 1 : 0),
        totalQuestions: state.totalQuestions + 1,
        learnedWords: newLearnedWords,
        reviewWords: newReviewWords
      };

    case GAME_ACTIONS.UPDATE_HP:
      const { player: hpPlayer, amount } = action;
      const playerForHp = state[hpPlayer];
      
      return {
        ...state,
        [hpPlayer]: {
          ...playerForHp,
          hp: Math.max(0, Math.min(playerForHp.maxHp, playerForHp.hp + amount))
        }
      };

    case GAME_ACTIONS.ADD_TO_LOG:
      return {
        ...state,
        battleLog: [...state.battleLog, action.message]
      };

    case GAME_ACTIONS.RESET_GAME:
      return initialGameState;

    default:
      return state;
  }
};

// ゲームコンテキスト
const GameContext = createContext();

// ゲームプロバイダー
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // ゲーム初期化
  const initializeGame = () => {
    dispatch({ type: GAME_ACTIONS.INITIALIZE_GAME });
  };

  // カードドロー
  const drawCard = (player) => {
    dispatch({ type: GAME_ACTIONS.DRAW_CARD, player });
  };

  // カードプレイ
  const playCard = (player, cardIndex, isCorrect) => {
    dispatch({ type: GAME_ACTIONS.PLAY_CARD, player, cardIndex, isCorrect });
  };

  // 攻撃
  const attack = (attackingCard, defendingPlayer, defendingCardIndex = null) => {
    dispatch({ type: GAME_ACTIONS.ATTACK, attackingCard, defendingPlayer, defendingCardIndex });
  };

  // ターン終了
  const endTurn = () => {
    dispatch({ type: GAME_ACTIONS.END_TURN });
  };

  // フェーズ進行
  const nextPhase = () => {
    dispatch({ type: GAME_ACTIONS.NEXT_PHASE });
  };

  // カード選択
  const selectCard = (card) => {
    dispatch({ type: GAME_ACTIONS.SELECT_CARD, card });
  };

  // 質問回答
  const answerQuestion = (correct, wordId) => {
    dispatch({ type: GAME_ACTIONS.ANSWER_QUESTION, correct, wordId });
  };

  // HP更新
  const updateHP = (player, amount) => {
    dispatch({ type: GAME_ACTIONS.UPDATE_HP, player, amount });
  };

  // ログ追加
  const addToLog = (message) => {
    dispatch({ type: GAME_ACTIONS.ADD_TO_LOG, message });
  };

  // ゲームリセット
  const resetGame = () => {
    dispatch({ type: GAME_ACTIONS.RESET_GAME });
  };

  // AIのターン処理
  const processAITurn = () => {
    if (gameState.currentTurn === 'player2' && gameState.gameStatus === 'playing') {
        // AIの行動を非同期で実行
        const aiActions = async () => {
          console.log("AI Turn: Starting AI actions.");
        console.log("AI Turn: Draw Phase");
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, player: 'player2' });
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch({ type: GAME_ACTIONS.NEXT_PHASE }); // メインフェーズへ
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log("AI Turn: Main Phase - Playing Cards");
        // 最新のgameStateを取得するためにuseRefを使用する代わりに、
        // 現在のgameStateを使用
        let playedCardThisTurn = false;
        const playableCards = gameState.player2.hand.filter(card => card.cost <= gameState.player2.mana);
        
        if (playableCards.length > 0) {
          playableCards.sort((a, b) => a.cost - b.cost);
          const cardToPlay = playableCards[0];
          const cardIndex = gameState.player2.hand.indexOf(cardToPlay);
          console.log("AI Turn: Playing card", cardToPlay);
          dispatch({ type: GAME_ACTIONS.PLAY_CARD, player: 'player2', cardIndex, isCorrect: true }); // AIは常に正解
          playedCardThisTurn = true;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        dispatch({ type: GAME_ACTIONS.NEXT_PHASE }); // バトルフェーズへ
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log("AI Turn: Battle Phase - Attacking");
        // 攻撃前に最新のgameStateを取得
        const aiFieldCards = gameState.player2.field;
        for (const card of aiFieldCards) {
          console.log("AI Turn: Attacking with card", card);
          dispatch({ type: GAME_ACTIONS.ATTACK, attackingCard: card, defendingPlayer: 'player1' });
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log("AI Turn: Ending Turn");
        dispatch({ type: GAME_ACTIONS.END_TURN });
      };
      aiActions();
    }
  };

  // AIターンの自動処理
  useEffect(() => {
    processAITurn();
  }, [gameState.currentTurn]);

  const value = {
    gameState,
    initializeGame,
    drawCard,
    playCard,
    attack,
    endTurn,
    nextPhase,
    selectCard,
    answerQuestion,
    updateHP,
    addToLog,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// カスタムフック
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
