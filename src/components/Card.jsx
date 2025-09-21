import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSpecialEffect } from '../data/wordData';

const Card = ({ 
  card, 
  isSelected = false, 
  isPlayable = true, 
  onClick, 
  onPlay,
  showAnswer = false,
  isInHand = false 
}) => {
  const [showMeaning, setShowMeaning] = useState(showAnswer);
  const [isFlipped, setIsFlipped] = useState(false);

  const getPartOfSpeechColor = (partOfSpeech) => {
    const colors = {
      verb: 'bg-red-500',
      noun: 'bg-blue-500',
      adjective: 'bg-green-500',
      adverb: 'bg-purple-500'
    };
    return colors[partOfSpeech] || 'bg-gray-500';
  };

  const getPartOfSpeechIcon = (partOfSpeech) => {
    const icons = {
      verb: <Zap className="w-4 h-4" />,
      noun: <Heart className="w-4 h-4" />,
      adjective: <Shield className="w-4 h-4" />,
      adverb: <Sword className="w-4 h-4" />
    };
    return icons[partOfSpeech] || <BookOpen className="w-4 h-4" />;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
    setShowMeaning(!showMeaning);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay(card);
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
      onClick={handleCardClick}
      whileHover={{ scale: isInHand ? 1.05 : 1.02, y: isInHand ? -10 : 0 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotateY: isFlipped ? 180 : 0,
        scale: isSelected ? 1.1 : 1
      }}
      transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <UICard className={`
        w-32 h-44 relative overflow-hidden
        ${isPlayable ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'}
        ${isSelected ? 'ring-2 ring-yellow-400 shadow-xl' : ''}
        bg-gradient-to-br from-slate-800 to-slate-900
        border-2 border-slate-600
      `}>
        {/* フロント面 */}
        <div className={`absolute inset-0 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
             style={{ backfaceVisibility: 'hidden' }}>
          <CardHeader className="p-2 pb-1">
            <div className="flex justify-between items-start">
              <Badge className={`${getPartOfSpeechColor(card.partOfSpeech)} text-white text-xs px-1 py-0.5`}>
                {getPartOfSpeechIcon(card.partOfSpeech)}
              </Badge>
              <Badge variant="outline" className="text-xs px-1 py-0.5 bg-yellow-500 text-black font-bold">
                {card.cost}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-2 pt-0 flex flex-col justify-between h-32">
            <div className="text-center">
              <CardTitle className="text-sm font-bold text-white mb-1 leading-tight">
                {card.word}
              </CardTitle>
              
              {showMeaning && (
                <motion.p 
                  className="text-xs text-gray-300 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {card.meaning}
                </motion.p>
              )}
            </div>
            
            <div className="flex justify-between items-end">
              <div className="flex items-center text-red-400">
                <Sword className="w-3 h-3 mr-1" />
                <span className="text-xs font-bold">{card.attack}</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Shield className="w-3 h-3 mr-1" />
                <span className="text-xs font-bold">{card.defense}</span>
              </div>
            </div>
          </CardContent>
        </div>

        {/* バック面 */}
        <div className={`absolute inset-0 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
             style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <CardContent className="p-2 flex flex-col justify-center h-full text-center">
            <p className="text-xs text-gray-300 mb-2">
              {card.meaning}
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              {getSpecialEffect(card.partOfSpeech)}
            </p>
          </CardContent>
        </div>

        {/* カードアクションボタン */}
        {isInHand && (
          <div className="absolute bottom-1 left-1 right-1 flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-6 text-xs"
              onClick={handleFlip}
            >
              ?
            </Button>
            {onPlay && isPlayable && (
              <Button
                size="sm"
                className="flex-1 h-6 text-xs bg-green-600 hover:bg-green-700"
                onClick={handlePlay}
              >
                Play
              </Button>
            )}
          </div>
        )}

        {/* 難易度インジケーター */}
        <div className="absolute top-1 right-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full mr-0.5 ${
                  i < card.difficulty ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </UICard>
    </motion.div>
  );
};

export default Card;
