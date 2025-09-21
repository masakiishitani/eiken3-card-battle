import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Target, TrendingUp, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGame } from '../contexts/GameContext';
import { analyzeWordDistribution } from '../data/extendedWordData';

const LearningProgress = () => {
  const { gameState } = useGame();
  const wordDistribution = analyzeWordDistribution();
  
  const accuracyRate = gameState.totalQuestions > 0 
    ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) 
    : 0;
  
  const learningProgress = Math.round((gameState.learnedWords.size / wordDistribution.total) * 100);
  
  const getAccuracyColor = (rate) => {
    if (rate >= 80) return 'text-green-500';
    if (rate >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (progress) => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };
  
  const getLevelFromProgress = (progress) => {
    if (progress >= 80) return { level: 'エキスパート', icon: <Award className="w-5 h-5" /> };
    if (progress >= 60) return { level: '上級者', icon: <Star className="w-5 h-5" /> };
    if (progress >= 40) return { level: '中級者', icon: <Trophy className="w-5 h-5" /> };
    if (progress >= 20) return { level: '初級者', icon: <Target className="w-5 h-5" /> };
    return { level: 'ビギナー', icon: <BookOpen className="w-5 h-5" /> };
  };
  
  const currentLevel = getLevelFromProgress(learningProgress);
  
  return (
    <div className="space-y-4">
      {/* 総合進捗 */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="w-5 h-5" />
            学習進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* レベル表示 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentLevel.icon}
                <span className="text-lg font-bold text-white">{currentLevel.level}</span>
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                {learningProgress}% 完了
              </Badge>
            </div>
            
            {/* 進捗バー */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">学習済み単語</span>
                <span className="text-white">{gameState.learnedWords.size} / {wordDistribution.total}</span>
              </div>
              <Progress 
                value={learningProgress} 
                className={`h-3 ${getProgressColor(learningProgress)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 統計情報 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 正答率 */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4" />
              正答率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getAccuracyColor(accuracyRate)}`}>
              {accuracyRate}%
            </div>
            <div className="text-xs text-gray-400">
              {gameState.correctAnswers} / {gameState.totalQuestions} 問正解
            </div>
          </CardContent>
        </Card>

        {/* 復習が必要な単語 */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              復習単語
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {gameState.reviewWords.size}
            </div>
            <div className="text-xs text-gray-400">
              間違えた単語数
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 品詞別進捗 */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-300">品詞別学習状況</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'verb', name: '動詞', color: 'bg-red-500', total: wordDistribution.verb },
              { type: 'noun', name: '名詞', color: 'bg-blue-500', total: wordDistribution.noun },
              { type: 'adjective', name: '形容詞', color: 'bg-green-500', total: wordDistribution.adjective },
              { type: 'adverb', name: '副詞', color: 'bg-purple-500', total: wordDistribution.adverb }
            ].map(({ type, name, color, total }) => {
              const learned = Array.from(gameState.learnedWords).filter(id => {
                // 実際の実装では、学習済み単語のIDから品詞を判定する必要があります
                return true; // 簡略化
              }).length;
              const progress = total > 0 ? Math.round((learned / total) * 100) : 0;
              
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{name}</span>
                    <span className="text-white">{Math.floor(total * progress / 100)} / {total}</span>
                  </div>
                  <Progress value={progress} className={`h-2 ${color}`} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 学習のヒント */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-green-400 flex items-center gap-2">
            <Star className="w-4 h-4" />
            学習のコツ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-300 space-y-2">
            {accuracyRate < 60 && (
              <p>• カードをプレイする前に「?」ボタンで意味を確認しましょう</p>
            )}
            {gameState.reviewWords.size > 5 && (
              <p>• 間違えた単語が増えています。復習を重点的に行いましょう</p>
            )}
            {learningProgress < 30 && (
              <p>• 毎日少しずつでも続けることが大切です</p>
            )}
            {accuracyRate >= 80 && (
              <p>• 素晴らしい正答率です！この調子で頑張りましょう</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningProgress;
