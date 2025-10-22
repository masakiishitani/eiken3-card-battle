import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Target, Zap, Heart, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HowToPlayModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "ゲームの目的",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg">英単語を覚えながら、AIとカードバトルを楽しもう！</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">勝利条件</h4>
            <p>相手のHPを0にすると勝利です</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">学習効果</h4>
            <p>ゲームを進めるほど英単語が自然に身につきます</p>
          </div>
        </div>
      )
    },
    {
      title: "カードの見方",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-lg text-white relative">
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500">3</Badge>
            </div>
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 text-black">6</Badge>
            </div>
            <div className="text-center mt-8 mb-4">
              <div className="text-2xl font-bold">go</div>
              <div className="text-lg">行く</div>
            </div>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-green-500">6</Badge>
            </div>
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-purple-500">4</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500">3</Badge>
              <span>コスト（マナ消費量）</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500 text-black">6</Badge>
              <span>レアリティ</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">6</Badge>
              <span>攻撃力</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500">4</Badge>
              <span>防御力</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ゲームの流れ",
      icon: <Play className="w-8 h-8 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center">1</Badge>
              <div>
                <h4 className="font-semibold">ドローフェーズ</h4>
                <p className="text-sm text-gray-600">カードを1枚引きます</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center">2</Badge>
              <div>
                <h4 className="font-semibold">メインフェーズ</h4>
                <p className="text-sm text-gray-600">カードをプレイしてフィールドに出します</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center">3</Badge>
              <div>
                <h4 className="font-semibold">バトルフェーズ</h4>
                <p className="text-sm text-gray-600">フィールドのカードで攻撃します</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center">4</Badge>
              <div>
                <h4 className="font-semibold">ターン終了</h4>
                <p className="text-sm text-gray-600">相手のターンになります</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "クイズシステム",
      icon: <Target className="w-8 h-8 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" />
              カードをプレイするには？
            </h4>
            <p>カードの「Play」ボタンを押すと英単語クイズが出題されます</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <div>
                <h5 className="font-semibold text-green-700">正解した場合</h5>
                <p className="text-sm">カードがフィールドに出て、攻撃できるようになります</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">✗</div>
              <div>
                <h5 className="font-semibold text-red-700">不正解の場合</h5>
                <p className="text-sm">カードは手札に戻り、マナも消費されません</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 学習のコツ</h4>
            <p className="text-sm">間違えた単語は復習リストに追加されるので、後で確認できます</p>
          </div>
        </div>
      )
    },
    {
      title: "マナシステム",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <Zap className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="font-semibold">マナとは？</h4>
              <p>カードをプレイするために必要なエネルギーです</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>初期マナ</span>
              <Badge className="bg-blue-500">10</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>ターン毎の回復</span>
              <Badge className="bg-green-500">+1</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>最大マナ</span>
              <Badge className="bg-purple-500">10</Badge>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">⚡ 戦略のポイント</h4>
            <ul className="text-sm space-y-1">
              <li>• コストの低いカードから使おう</li>
              <li>• マナが足りない時は「ターン終了」を選択</li>
              <li>• 強力なカードは後半に使うのが効果的</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "学習記録機能",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              自動学習記録
            </h4>
            <p>ゲーム中の正解・不正解が自動的に記録されます</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-gray-100 rounded">
              <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm">?</div>
              <div className="text-xs font-semibold">未学習</div>
              <div className="text-xs text-gray-600">まだ出会っていない単語</div>
            </div>
            <div className="p-3 bg-yellow-100 rounded">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm">📝</div>
              <div className="text-xs font-semibold">学習中</div>
              <div className="text-xs text-gray-600">練習が必要な単語</div>
            </div>
            <div className="p-3 bg-green-100 rounded">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm">✓</div>
              <div className="text-xs font-semibold">習得済み</div>
              <div className="text-xs text-gray-600">覚えた単語</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📊 進捗確認</h4>
            <p className="text-sm">「学習記録」ボタンから、いつでも学習状況を確認できます</p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
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
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {steps[currentStep].icon}
            <h2 className="text-2xl font-bold text-gray-800">遊び方</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* プログレスバー */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {currentStep + 1} / {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {steps[currentStep].title}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ステップナビゲーション */}
        <div className="px-6 py-3 border-t bg-gray-50">
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-500' 
                    : index < currentStep 
                      ? 'bg-blue-300' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              前へ
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={onClose} className="flex items-center gap-2">
                ゲームを始める
                <Play className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                次へ
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToPlayModal;
