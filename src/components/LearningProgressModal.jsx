import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Trophy, Target, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLearningProgress } from '../hooks/useLearningProgress';

const LearningProgressModal = ({ isOpen, onClose }) => {
  const { learningData, getLearningStats, getWordsNeedingReview, LEARNING_STATUS } = useLearningProgress();
  
  if (!isOpen) return null;

  const stats = getLearningStats();
  const reviewWords = getWordsNeedingReview();

  // 学習状態別の単語リスト
  const wordsByStatus = {
    [LEARNING_STATUS.MASTERED]: Object.values(learningData).filter(w => w.status === LEARNING_STATUS.MASTERED),
    [LEARNING_STATUS.LEARNING]: Object.values(learningData).filter(w => w.status === LEARNING_STATUS.LEARNING),
    [LEARNING_STATUS.NOT_ENCOUNTERED]: Object.values(learningData).filter(w => w.status === LEARNING_STATUS.NOT_ENCOUNTERED)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case LEARNING_STATUS.MASTERED: return 'bg-green-100 text-green-800';
      case LEARNING_STATUS.LEARNING: return 'bg-yellow-100 text-yellow-800';
      case LEARNING_STATUS.NOT_ENCOUNTERED: return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case LEARNING_STATUS.MASTERED: return '習得済み';
      case LEARNING_STATUS.LEARNING: return '学習中';
      case LEARNING_STATUS.NOT_ENCOUNTERED: return '未学習';
      default: return '未学習';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">学習進捗</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* 学習統計 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.masteredWords}</div>
                <div className="text-sm text-gray-600">習得済み</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.learningWords}</div>
                <div className="text-sm text-gray-600">学習中</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.overallAccuracy}%</div>
                <div className="text-sm text-gray-600">正答率</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.completionRate}%</div>
                <div className="text-sm text-gray-600">完了率</div>
              </CardContent>
            </Card>
          </div>

          {/* 進捗バー */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                英検3級単語 習得状況
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>習得済み: {stats.masteredWords}語</span>
                    <span>全体: {stats.totalWords}語</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-green-600">{stats.masteredWords}</div>
                    <div className="text-xs text-gray-600">習得済み</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-600">{stats.learningWords}</div>
                    <div className="text-xs text-gray-600">学習中</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-500">{stats.notEncounteredWords}</div>
                    <div className="text-xs text-gray-600">未学習</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 復習が必要な単語 */}
          {reviewWords.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  復習が必要な単語 ({reviewWords.length}語)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {reviewWords.slice(0, 10).map(word => (
                    <div key={word.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium">{word.word}</div>
                        <div className="text-sm text-gray-600">{word.meaning}</div>
                      </div>
                      <div className="text-sm text-orange-600">
                        {word.accuracy}%
                      </div>
                    </div>
                  ))}
                </div>
                {reviewWords.length > 10 && (
                  <div className="text-center mt-4 text-sm text-gray-600">
                    他 {reviewWords.length - 10} 語...
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 単語リスト */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(wordsByStatus).map(([status, words]) => (
              <Card key={status}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {getStatusText(status)} ({words.length}語)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {words.slice(0, 20).map(word => (
                      <div key={word.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{word.word}</div>
                          <div className="text-xs text-gray-600">{word.meaning}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge className={`text-xs ${getStatusColor(word.status)}`}>
                            {getStatusText(word.status)}
                          </Badge>
                          {word.totalAttempts > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {word.accuracy}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {words.length > 20 && (
                      <div className="text-center text-sm text-gray-500">
                        他 {words.length - 20} 語...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningProgressModal;
