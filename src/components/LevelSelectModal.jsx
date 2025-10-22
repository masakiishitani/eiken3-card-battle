import React from 'react';
import { X, BookOpen, Star, Zap } from 'lucide-react';

const LevelSelectModal = ({ isOpen, onClose, onSelectLevel, currentLevel }) => {
  if (!isOpen) return null;

  const levels = [
    {
      id: 'eiken4',
      name: '英検4級',
      description: '基礎レベル',
      wordCount: '300語',
      difficulty: '★☆☆',
      color: 'bg-green-500',
      icon: BookOpen,
      features: ['基本的な単語', '日常会話レベル', '初心者向け']
    },
    {
      id: 'eiken3',
      name: '英検3級',
      description: '標準レベル',
      wordCount: '365語',
      difficulty: '★★☆',
      color: 'bg-blue-500',
      icon: Star,
      features: ['中学校レベル', '実用的な語彙', '標準的な難易度']
    },
    {
      id: 'mixed',
      name: '混合モード',
      description: '4級+3級',
      wordCount: '665語',
      difficulty: '★★★',
      color: 'bg-purple-500',
      icon: Zap,
      features: ['全レベル対応', '幅広い語彙', '上級者向け']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">レベル選択</h2>
            <p className="text-gray-600 mt-1">学習したいレベルを選択してください</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* レベル選択カード */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => {
              const Icon = level.icon;
              const isSelected = currentLevel === level.id;
              
              return (
                <div
                  key={level.id}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onSelectLevel(level.id)}
                >
                  {/* 選択インジケーター */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}

                  {/* アイコンとレベル名 */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${level.color} text-white mr-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{level.name}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </div>

                  {/* 統計情報 */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">単語数</span>
                      <span className="font-semibold text-gray-800">{level.wordCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">難易度</span>
                      <span className="font-semibold text-yellow-600">{level.difficulty}</span>
                    </div>
                  </div>

                  {/* 特徴 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">特徴</h4>
                    <ul className="space-y-1">
                      {level.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 選択ボタン */}
                  <button
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLevel(level.id);
                    }}
                  >
                    {isSelected ? '選択中' : '選択する'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* 注意事項 */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📝 レベル選択について</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 英検4級：初心者や基礎を固めたい方におすすめ</li>
              <li>• 英検3級：中学生レベルの標準的な学習に最適</li>
              <li>• 混合モード：両方のレベルからランダムに出題される上級者向け</li>
              <li>• 学習進捗はレベル別に個別管理されます</li>
            </ul>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ゲーム開始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelectModal;
