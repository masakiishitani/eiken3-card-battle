import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Clock, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '../contexts/GameContext';
import Card from './Card';
import QuizModal from './QuizModal';

const GameBoard = () => {
  const { 
    gameState, 
    initializeGame, 
    drawCard, 
    playCard, 
    attack, 
    endTurn, 
    nextPhase, 
    selectCard,
    resetGame 
  } = useGame();

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCardForQuiz, setSelectedCardForQuiz] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  // ゲーム初期化
  useEffect(() => {
    if (gameState.player1.deck.length === 0) {
      initializeGame();
    }
  }, []);

  // ターン開始時のカードドロー
  useEffect(() => {
    if (gameState.phase === 'draw' && gameState.currentTurn === 'player1') {
      drawCard('player1');
      nextPhase();
    }
  }, [gameState.phase, gameState.currentTurn]);

  const handleCardPlay = (card, cardIndex) => {
    if (gameState.currentTurn !== 'player1' || gameState.phase !== 'main') return;
    
    setSelectedCardForQuiz(card);
    setSelectedCardIndex(cardIndex);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (isCorrect) => {
    if (selectedCardForQuiz && selectedCardIndex !== null) {
      playCard('player1', selectedCardIndex, isCorrect);
      
      // 特殊効果の処理
      if (isCorrect && selectedCardForQuiz.partOfSpeech === 'noun') {
        // 名詞の特殊効果: HP回復
        const newHp = Math.min(gameState.player1.maxHp, gameState.player1.hp + 5);
        // updateHP('player1', 5); // この機能は後で実装
      }
    }
    
    setShowQuiz(false);
    setSelectedCardForQuiz(null);
    setSelectedCardIndex(null);
  };

  const handleAttack = (attackingCard) => {
    if (gameState.phase !== 'battle') return;
    
    // 相手に直接攻撃
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
    return gameState.currentTurn === 'player1' && gameState.phase === 'battle';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      {/* ヘッダー情報 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            ターン {gameState.turnCount}
          </Badge>
          <Badge className={`text-lg px-3 py-1 ${
            gameState.currentTurn === 'player1' ? 'bg-blue-600' : 'bg-red-600'
          }`}>
            {gameState.currentTurn === 'player1' ? 'あなたのターン' : 'AIのターン'}
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {gameState.phase === 'main' ? 'メインフェーズ' : 
             gameState.phase === 'battle' ? 'バトルフェーズ' : 
             gameState.phase === 'draw' ? 'ドローフェーズ' : 'エンドフェーズ'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            <span className="text-white">
              正答率: {gameState.totalQuestions > 0 ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) : 0}%
            </span>
          </div>
          <Button variant="outline" onClick={resetGame}>
            リセット
          </Button>
        </div>
      </div>

      {/* 相手（AI）エリア */}
      <div className="mb-6">
        <UICard className="bg-red-900/20 border-red-500/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                AI: {gameState.player2.hp}/{gameState.player2.maxHp}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">{gameState.player2.mana}</span>
              </div>
            </div>
            <Progress value={(gameState.player2.hp / gameState.player2.maxHp) * 100} className="h-2" />
          </CardHeader>
          <CardContent>
            {/* AI手札（裏向き） */}
            <div className="flex gap-2 mb-4">
              {gameState.player2.hand.map((_, index) => (
                <div key={index} className="w-16 h-24 bg-red-800 rounded border-2 border-red-600 flex items-center justify-center">
                  <span className="text-red-400 text-xs">?</span>
                </div>
              ))}
            </div>
            
            {/* AIフィールド */}
            <div className="flex gap-2">
              {gameState.player2.field.map((card, index) => (
                <Card
                  key={`ai-field-${index}`}
                  card={card}
                  showAnswer={true}
                  isPlayable={false}
                />
              ))}
            </div>
          </CardContent>
        </UICard>
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
              {gameState.player1.field.map((card, index) => (
                <Card
                  key={`player-field-${index}`}
                  card={card}
                  showAnswer={true}
                  isPlayable={canAttack(card)}
                  onClick={() => canAttack(card) && handleAttack(card)}
                />
              ))}
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
            <div className="flex gap-2 justify-center">
              {gameState.player1.hand.map((card, index) => (
                <Card
                  key={`player-hand-${index}`}
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

      {/* クイズモーダル */}
      <AnimatePresence>
        {showQuiz && selectedCardForQuiz && (
          <QuizModal
            card={selectedCardForQuiz}
            onAnswer={handleQuizAnswer}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameBoard;
