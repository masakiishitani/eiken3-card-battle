import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { buildRecommendedDeck, calculateBalancedCardStats, extendedEiken3Words } from '../data/extendedWordData';
import { eiken4Words, calculateEiken4CardStats } from '../data/eiken4WordData';
import { buildLevelBasedDeck } from '../utils/levelUtils';
import { useLearningProgress } from '../hooks/useLearningProgress';

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
  attackedCardsThisTurn: new Set(), // カードIDのセット
  // レベル選択
  selectedLevel: 'eiken3', // eiken4, eiken3, mixed
  availableWords: []
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
  GAIN_MANA: 'GAIN_MANA',
  SET_LEVEL: 'SET_LEVEL'
};

// ゲーム状態のリデューサー
const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.INITIALIZE_GAME:
      const currentLevel = action.level || state.selectedLevel;
      const player1Deck = buildLevelBasedDeck(currentLevel, 1); // プレイヤーレベル1
      const player2Deck = buildLevelBasedDeck(currentLevel, 1); // AIレベル1
      
      return {
        ...initialGameState,
        selectedLevel: currentLevel,
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
        // 不正解の場合、カードは手札から消え、カードのコスト分のマナが消費される
        const newHand = playingPlayerState.hand.filter((_, index) => index !== cardIndex);
        const manaPenalty = Math.min(cardToPlay.cost, playingPlayerState.mana); // 現在のマナを超えないように制限
        const newMana = playingPlayerState.mana - manaPenalty;
        
        return {
          ...state,
          [playingPlayer]: {
            ...playingPlayerState,
            hand: newHand,
            mana: newMana
          },
          battleLog: [...state.battleLog, `${cardToPlay.word}のクイズに失敗しました。カードは消滅し、マナ${manaPenalty}を失いました。`]
        };
      }

    case GAME_ACTIONS.ATTACK:
      const { attackingCard, defendingPlayer, defendingCardIndex } = action;
      const attackerPlayer = state[state.currentTurn];
      const defender = state[defendingPlayer];
      
      // 攻撃制限チェック（ターンごとに1回のみ）
      const cardId = `${attackingCard.id}-${attackingCard.word}`;
      if (state.attackedCardsThisTurn.has(cardId)) {
        return {
          ...state,
          battleLog: [...state.battleLog, `${attackingCard.word}はすでにこのターン攻撃済みです！`]
        };
      }
      
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
      
      // 攻撃済みカードとして記録
      const newAttackedCardsThisTurn = new Set(state.attackedCardsThisTurn);
      newAttackedCardsThisTurn.add(cardId);
      
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
        battleLog: [...state.battleLog, logMessage],
        attackedCardsThisTurn: newAttackedCardsThisTurn
      };

    case GAME_ACTIONS.END_TURN:
      const nextPlayer = state.currentTurn === 'player1' ? 'player2' : 'player1';
      const nextTurnCount = nextPlayer === 'player1' ? state.turnCount + 1 : state.turnCount;
      
      // マナ回復
      const currentPlayerForMana = state[state.currentTurn];
      const newManaAmount = Math.min(currentPlayerForMana.maxMana, currentPlayerForMana.mana + 1);
      
      // 攻撃済みカードをフィールドから削除し、墓地に送る
      const attackedCardIds = Array.from(state.attackedCardsThisTurn);
      const newPlayer1Field = state.player1.field.filter(card => {
        const cardId = `${card.id}-${card.word}`;
        return !attackedCardIds.includes(cardId);
      });
      const newPlayer2Field = state.player2.field.filter(card => {
        const cardId = `${card.id}-${card.word}`;
        return !attackedCardIds.includes(cardId);
      });
      
      // 削除されたカードを墓地に送る
      const removedPlayer1Cards = state.player1.field.filter(card => {
        const cardId = `${card.id}-${card.word}`;
        return attackedCardIds.includes(cardId);
      });
      const removedPlayer2Cards = state.player2.field.filter(card => {
        const cardId = `${card.id}-${card.word}`;
        return attackedCardIds.includes(cardId);
      });
      
      return {
        ...state,
        currentTurn: nextPlayer,
        turnCount: nextTurnCount,
        phase: 'draw',
        selectedCard: null,
        targetCard: null,
        player1: {
          ...state.player1,
          field: newPlayer1Field,
          graveyard: [...state.player1.graveyard, ...removedPlayer1Cards]
        },
        player2: {
          ...state.player2,
          field: newPlayer2Field,
          graveyard: [...state.player2.graveyard, ...removedPlayer2Cards]
        },
        [state.currentTurn]: {
          ...currentPlayerForMana,
          mana: newManaAmount
        },
        attackedCardsThisTurn: new Set() // ターン終了時に攻撃済みカードをリセット
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
      
      // 学習進捗を記録（外部から注入される関数を使用）
      if (state.recordLearningAttempt) {
        state.recordLearningAttempt(wordId, correct);
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
      const newGamePlayer1Deck = buildRecommendedDeck(1); // プレイヤーレベル1
      const newGamePlayer2Deck = buildRecommendedDeck(1); // AIレベル1
      
      return {
        ...initialGameState,
        player1: {
          ...initialGameState.player1,
          deck: newGamePlayer1Deck.slice(5),
          hand: newGamePlayer1Deck.slice(0, 5)
        },
        player2: {
          ...initialGameState.player2,
          deck: newGamePlayer2Deck.slice(5),
          hand: newGamePlayer2Deck.slice(0, 5)
        }
      };

    case GAME_ACTIONS.SET_LEVEL:
      return {
        ...state,
        selectedLevel: action.level
      };

    default:
      return state;
  }
};

// ゲームコンテキスト
const GameContext = createContext();

// ゲームプロバイダーコンポーネント
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const { recordLearningAttempt, isInitialized } = useLearningProgress();
  
  // 学習記録関数をゲーム状態に注入
  useEffect(() => {
    if (isInitialized) {
      gameState.recordLearningAttempt = recordLearningAttempt;
    }
  }, [isInitialized, recordLearningAttempt]);  // ゲーム初期化
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

  // レベル設定
  const setLevel = (level) => {
    dispatch({ type: GAME_ACTIONS.SET_LEVEL, level });
  };

  // AIのターン処理は削除（useEffectで個別に処理  // AI処理済みフェーズを記録するためのuseRef
  const aiProcessedPhase = useRef(null);
  // 最新のgameStateを保持するためのuseRef
  const gameStateRef = useRef(gameState);
  
  // gameStateが更新されるたびにrefを更新
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]); // ターンが変わったらフラグをリセット
  useEffect(() => {
    aiProcessedPhase.current = null;
  }, [gameState.turnCount]);

  // AIターン: ドローフェーズ
  useEffect(() => {
    const phaseKey = `${gameState.turnCount}-draw`;
    if (gameState.currentTurn === 'player2' && gameState.phase === 'draw' && gameState.gameStatus === 'playing' && aiProcessedPhase.current !== phaseKey) {
      aiProcessedPhase.current = phaseKey;
      console.log("AI Turn: Draw Phase");
      setTimeout(() => {
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, player: 'player2' });
        setTimeout(() => {
          dispatch({ type: GAME_ACTIONS.NEXT_PHASE });
        }, 500);
      }, 500);
    }
  }, [gameState.currentTurn, gameState.phase, gameState.turnCount]);

  // AIターン: メインフェーズ - カードをプレイ
  useEffect(() => {
    const phaseKey = `${gameState.turnCount}-main`;
    if (gameState.currentTurn === 'player2' && gameState.phase === 'main' && gameState.gameStatus === 'playing' && aiProcessedPhase.current !== phaseKey) {
      aiProcessedPhase.current = phaseKey;
      console.log("AI Turn: Main Phase - Playing card");
      
      const playableCards = gameState.player2.hand.filter(card => card.cost <= gameState.player2.mana);
      
      if (playableCards.length > 0) {
        playableCards.sort((a, b) => a.cost - b.cost);
        const cardToPlay = playableCards[0];
        const cardIndex = gameState.player2.hand.indexOf(cardToPlay);
        console.log("AI Turn: Playing card", cardToPlay);
        
        setTimeout(() => {
          dispatch({ type: GAME_ACTIONS.PLAY_CARD, player: 'player2', cardIndex, isCorrect: true });
        }, 500);
      } else {
        // プレイできるカードがない場合はバトルフェーズへ
        console.log("AI Turn: No playable cards, moving to battle");
        setTimeout(() => {
          dispatch({ type: GAME_ACTIONS.NEXT_PHASE });
        }, 500);
      }
    }
  }, [gameState.currentTurn, gameState.phase, gameState.turnCount, gameState.player2.hand, gameState.player2.mana]);

  // AIターン: フィールドにカードが追加されたらバトルフェーズへ移行
  useEffect(() => {
    const phaseKey = `${gameState.turnCount}-main-to-battle`;
    if (
      gameState.currentTurn === 'player2' && 
      gameState.phase === 'main' && 
      gameState.gameStatus === 'playing' &&
      gameState.player2.field.length > 0 &&
      aiProcessedPhase.current !== phaseKey
    ) {
      aiProcessedPhase.current = phaseKey;
      console.log("AI Turn: Card added to field, moving to battle phase");
      
      setTimeout(() => {
        dispatch({ type: GAME_ACTIONS.NEXT_PHASE });
      }, 500);
    }
  }, [gameState.currentTurn, gameState.phase, gameState.turnCount, gameState.player2.field.length, gameState.gameStatus]);

  // AIターン: バトルフェーズ - 攻撃
  useEffect(() => {
    const phaseKey = `${gameState.turnCount}-battle`;
    if (gameState.currentTurn === 'player2' && gameState.phase === 'battle' && gameState.gameStatus === 'playing' && aiProcessedPhase.current !== phaseKey) {
      aiProcessedPhase.current = phaseKey;
      console.log("AI Turn: Battle Phase - Attacking");
      console.log("AI Field Cards:", gameState.player2.field);
      
      const aiFieldCards = gameState.player2.field;
      const attackedCards = gameState.attackedCardsThisTurn;
      
      if (aiFieldCards.length > 0) {
        aiFieldCards.forEach((card, index) => {
          const cardId = `${card.id}-${card.word}`;
          if (!attackedCards.has(cardId)) {
            console.log("AI Turn: Attacking with", card);
            setTimeout(() => {
              dispatch({ type: GAME_ACTIONS.ATTACK, attackingCard: card, defendingPlayer: 'player1' });
            }, (index + 1) * 500);
          }
        });
        
        // ターン終了
        const attackDelay = aiFieldCards.length * 500 + 1000;
        setTimeout(() => {
          console.log("AI Turn: Ending Turn");
          dispatch({ type: GAME_ACTIONS.END_TURN });
        }, attackDelay);
      } else {
        // フィールドにカードがない場合はターン終了
        console.log("AI Turn: No cards on field, ending turn");
        setTimeout(() => {
          dispatch({ type: GAME_ACTIONS.END_TURN });
        }, 1000);
      }
    }
  }, [gameState.currentTurn, gameState.phase, gameState.turnCount, gameState.player2.field, gameState.attackedCardsThisTurn, gameState.gameStatus]);

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
    resetGame,
    setLevel
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
