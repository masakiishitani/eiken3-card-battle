import React, { useState, useEffect, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Clock, Trophy, BookOpen, BarChart3, HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '../contexts/GameContext';
import Card from './Card';
import QuizModal from './QuizModal';
import LearningProgressModal from './LearningProgressModal';
import HowToPlayModal from './HowToPlayModal';
import LevelSelectModal from './LevelSelectModal';
import { getLevelInfo } from '../utils/levelUtils';

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_QUIZ':
      return { ...state, showQuiz: true, selectedCardForQuiz: action.card, selectedCardIndex: action.cardIndex };
    case 'HIDE_QUIZ':
      return { ...state, showQuiz: false, selectedCardForQuiz: null, selectedCardIndex: null };
    default:
      return state;
  }
};

const GameBoard = () => {
  const { 
    gameState, 
    initializeGame, 
    drawCard, 
    playCard, 
    attack, 
    endTurn, 
    nextPhase, 
    answerQuestion,
    resetGame,
    setLevel
  } = useGame();

  const [boardState, dispatchBoard] = useReducer(boardReducer, {
    showQuiz: false,
    selectedCardForQuiz: null,
    selectedCardIndex: null,
  });
  
  const [showLearningProgress, setShowLearningProgress] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);

  useEffect(() => {
    if (gameState.player1.deck.length === 0) {
      initializeGame();
    }
  }, []);

  useEffect(() => {
    if (gameState.phase === 'draw' && gameState.currentTurn === 'player1') {
      drawCard('player1');
      nextPhase();
    }
  }, [gameState.phase, gameState.currentTurn]);

  const handleCardPlay = (card, cardIndex) => {
    if (gameState.currentTurn !== 'player1' || gameState.phase !== 'main') return;
    dispatchBoard({ type: 'SHOW_QUIZ', card, cardIndex });
  };

  const handleQuizAnswer = (isCorrect) => {
    if (boardState.selectedCardForQuiz && boardState.selectedCardIndex !== null) {
      // 学習記録を更新
      answerQuestion(isCorrect, boardState.selectedCardForQuiz.id);
      // カードをプレイ
      playCard('player1', boardState.selectedCardIndex, isCorrect);
    }
    dispatchBoard({ type: 'HIDE_QUIZ' });
  };

  const handleAttack = (attackingCard) => {
    if (gameState.phase !== 'battle') return;
    attack(attackingCard, 'player2');
  };

  const handleEndTurn = () => {
    endTurn();
  };

  const handleNextPhase = () => {
    nextPhase();
  };

  const getPhaseButtonText = () => {
    switch (gameState.phase) {
      case 'main': return 'バトルフェーズへ';
      case 'battle': return 'ターン終了';
      default: return 'フェーズ進行';
    }
  };

  const canPlayCard = (card) => {
    return gameState.currentTurn === 'player1' && 
           gameState.phase === 'main' && 
           gameState.player1.mana >= card.cost;
  };

  const canAttack = (card) => {
    const cardId = `${card.id}-${card.word}`;
    const hasAttacked = gameState.attackedCardsThisTurn.has(cardId);
    return gameState.currentTurn === 'player1' && 
           gameState.phase === 'battle' && 
           !hasAttacked;
  };

  if (gameState.gameStatus !== 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <UICard className="w-96 text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              ゲーム終了
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              {gameState.gameStatus === 'player1Win' ? '勝利！' : '敗北...'}
            </p>
            <div className="mb-4">
              <p>正答率: {gameState.totalQuestions > 0 ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) : 0}%</p>
              <p>学習した単語: {gameState.learnedWords.size}語</p>
            </div>
            <Button onClick={resetGame} className="w-full">
              もう一度プレイ
            </Button>
          </CardContent>
        </UICard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 overflow-x-hidden">
      {/* ゲーム情報 */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-white">
            ターン {gameState.turnCount}
          </Badge>
          <Badge variant="outline" className={gameState.currentTurn === 'player1' ? 'bg-blue-600' : 'bg-red-600'}>
            {gameState.currentTurn === 'player1' ? 'あなたのターン' : 'AIのターン'}
          </Badge>
          <Badge variant="outline" className="text-white">
            {gameState.phase === 'draw' ? 'ドロー' : 
             gameState.phase === 'main' ? 'メイン' : 
             gameState.phase === 'battle' ? 'バトル' : 'エンド'}フェーズ
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setShowLevelSelect(true)} 
            variant="outline" 
            size="sm"
            className={`flex items-center gap-2 ${
              getLevelInfo(gameState.selectedLevel).color === 'green' ? 'border-green-500 text-green-500' :
              getLevelInfo(gameState.selectedLevel).color === 'blue' ? 'border-blue-500 text-blue-500' :
              'border-purple-500 text-purple-500'
            }`}
          >
            <Settings className="w-4 h-4" />
            {getLevelInfo(gameState.selectedLevel).name}
          </Button>
          <Button 
            onClick={() => setShowHowToPlay(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            遊び方
          </Button>
          <Button 
            onClick={() => setShowLearningProgress(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            学習記録
          </Button>
          <Button onClick={resetGame} variant="outline" size="sm">
            リセット
          </Button>
        </div>
      </div>

      {/* AIエリア */}
      <div className="mb-4">
        <UICard className="bg-red-900/20 border-red-500/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                AI: {gameState.player2.hp}/{gameState.player2.maxHp}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-red-400">{gameState.player2.mana}</span>
              </div>
            </div>
            <Progress value={(gameState.player2.hp / gameState.player2.maxHp) * 100} className="h-2" />
          </CardHeader>
        </UICard>
      </div>

      {/* AI手札（裏向き） */}
      <div className="flex gap-2 mb-4">
        {gameState.player2.hand.map((_, index) => (
          <div key={index} className="w-16 h-24 bg-red-800 rounded border-2 border-red-600 flex items-center justify-center">
            <span className="text-red-400 text-xs">?</span>
          </div>
        ))}
      </div>
      
      {/* AIフィールド */}
      <div className="flex gap-2 mb-6">
        {gameState.player2.field.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            showAnswer={true}
            isPlayable={false}
          />
        ))}
      </div>

      {/* バトルログ */}
      <div className="mb-6">
        <UICard className="bg-slate-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">バトルログ</CardTitle>
          </CardHeader>
          <CardContent className="max-h-24 overflow-y-auto">
            {gameState.battleLog.slice(-3).map((log, index) => (
              <p key={index} className="text-xs text-gray-300 mb-1">{log}</p>
            ))}
          </CardContent>
        </UICard>
      </div>

      {/* プレイヤーフィールド */}
      <div className="mb-4">
        <UICard className="bg-blue-900/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-400">あなたのフィールド</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 min-h-[120px]">
              {gameState.player1.field.map((card, index) => {
                const cardId = `${card.id}-${card.word}`;
                const hasAttacked = gameState.attackedCardsThisTurn.has(cardId);
                
                return (
                <Card
                  key={card.id}
                  card={card}
                  showAnswer={true}
                  isPlayable={canAttack(card)}
                  hasAttacked={hasAttacked}
                  onClick={() => canAttack(card) && handleAttack(card)}
                />
                );
              })}
              {gameState.player1.field.length === 0 && (
                <div className="flex-1 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">カードをプレイしてください</span>
                </div>
              )}
            </div>
          </CardContent>
        </UICard>
      </div>

      {/* プレイヤーエリア */}
      <div>
        <UICard className="bg-blue-900/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                あなた: {gameState.player1.hp}/{gameState.player1.maxHp}
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">{gameState.player1.mana}</span>
                </div>
                {gameState.currentTurn === 'player1' && (
                  <Button 
                    onClick={gameState.phase === 'battle' ? handleEndTurn : handleNextPhase}
                    variant="outline"
                    size="sm"
                  >
                    {getPhaseButtonText()}
                  </Button>
                )}
              </div>
            </div>
            <Progress value={(gameState.player1.hp / gameState.player1.maxHp) * 100} className="h-2" />
          </CardHeader>
          <CardContent>
            {/* プレイヤー手札 */}
            <div className="flex gap-2 justify-center flex-wrap">
              {gameState.player1.hand.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  isPlayable={canPlayCard(card)}
                  onPlay={() => handleCardPlay(card, index)}
                  isInHand={true}
                />
              ))}
            </div>
          </CardContent>
        </UICard>
      </div>

      <AnimatePresence>
        {boardState.showQuiz && boardState.selectedCardForQuiz && (
          <QuizModal
            card={boardState.selectedCardForQuiz}
            onAnswer={handleQuizAnswer}
            onClose={() => dispatchBoard({ type: 'HIDE_QUIZ' })}
          />
        )}
      </AnimatePresence>
      
      {/* レベル選択モーダル */}
      <LevelSelectModal
        isOpen={showLevelSelect}
        onClose={() => setShowLevelSelect(false)}
        onSelectLevel={(level) => {
          setLevel(level);
          initializeGame();
        }}
        currentLevel={gameState.selectedLevel}
      />
      
      {/* 学習進捗モーダル */}
      <LearningProgressModal 
        isOpen={showLearningProgress}
        onClose={() => setShowLearningProgress(false)}
      />
      
      {/* 遊び方モーダル */}
      <HowToPlayModal 
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
};

export default GameBoard;

