import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { extendedEiken3Words } from '../data/extendedWordData';

const QuizModal = ({ card, onAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState([]);

  // 選択肢を生成
  useEffect(() => {
    const generateOptions = () => {
      const correctAnswer = card.meaning;
      const wrongAnswers = extendedEiken3Words
        .filter(w => w.id !== card.id && w.partOfSpeech === card.partOfSpeech)
        .map(w => w.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const allOptions = [correctAnswer, ...wrongAnswers]
        .sort(() => 0.5 - Math.random());
      
      setOptions(allOptions);
    };

    generateOptions();
  }, [card]);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === card.meaning;
    setIsCorrect(correct);
    setShowResult(true);

    // 2秒後に結果を返し、その後モーダルを閉じる
    setTimeout(() => {
      onAnswer(correct);
      onClose(); // onAnswerの後にonCloseを呼び出す
    }, 2000);
  };

  const getPartOfSpeechColor = (partOfSpeech) => {
    const colors = {
      verb: 'bg-red-500',
      noun: 'bg-blue-500',
      adjective: 'bg-green-500',
      adverb: 'bg-purple-500'
    };
    return colors[partOfSpeech] || 'bg-gray-500';
  };

  const getPartOfSpeechName = (partOfSpeech) => {
    const names = {
      verb: '動詞',
      noun: '名詞',
      adjective: '形容詞',
      adverb: '副詞'
    };
    return names[partOfSpeech] || partOfSpeech;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <Card className="w-full max-w-md bg-slate-800 border-slate-600">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl text-white mb-2">
                  単語クイズ
                </CardTitle>
                <Badge className={`${getPartOfSpeechColor(card.partOfSpeech)} text-white`}>
                  {getPartOfSpeechName(card.partOfSpeech)}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* 問題 */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-white mb-2 p-4 bg-slate-700 rounded-lg">
                {card.word}
              </div>
              <p className="text-gray-300">この単語の意味は？</p>
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              {options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200 ";
                
                if (!showResult) {
                  buttonClass += "border-slate-600 hover:border-blue-400 hover:bg-slate-700 text-white";
                } else {
                  if (option === card.meaning) {
                    buttonClass += "border-green-500 bg-green-500/20 text-green-400";
                  } else if (option === selectedAnswer && option !== card.meaning) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-400";
                  } else {
                    buttonClass += "border-slate-600 text-gray-400";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && option === card.meaning && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && option === selectedAnswer && option !== card.meaning && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* 結果表示 */}
            {showResult && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className={`text-lg font-bold mb-2 ${
                  isCorrect ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isCorrect ? '正解！' : '不正解...'}
                </div>
                
                {!isCorrect && (
                  <div className="text-sm text-gray-300">
                    正解: <span className="text-green-400 font-bold">{card.meaning}</span>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-slate-700 rounded-lg text-sm text-gray-300">
                  {isCorrect ? 
                    'カードが正常にプレイされます！' : 
                    'カードの効果が減少します...'
                  }
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default QuizModal;
