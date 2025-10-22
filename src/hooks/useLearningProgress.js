import { useState, useEffect } from 'react';
import { eiken3Words } from '../data/wordData';

const STORAGE_KEY = 'eiken3_learning_progress';

// 学習状態の定義
const LEARNING_STATUS = {
  NOT_ENCOUNTERED: 'not_encountered',
  LEARNING: 'learning', 
  MASTERED: 'mastered'
};

// 習得レベルの判定
const calculateMasteryLevel = (correctAnswers, totalAttempts) => {
  if (totalAttempts === 0) return LEARNING_STATUS.NOT_ENCOUNTERED;
  
  const accuracy = (correctAnswers / totalAttempts) * 100;
  
  if (accuracy >= 80 && totalAttempts >= 3) {
    return LEARNING_STATUS.MASTERED;
  } else if (totalAttempts > 0) {
    return LEARNING_STATUS.LEARNING;
  }
  
  return LEARNING_STATUS.NOT_ENCOUNTERED;
};

export const useLearningProgress = () => {
  const [learningData, setLearningData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // 初期化：英検3級単語を事前登録
  const initializeLearningData = () => {
    const existingData = localStorage.getItem(STORAGE_KEY);
    
    if (existingData) {
      // 既存データがある場合は読み込み
      setLearningData(JSON.parse(existingData));
    } else {
      // 初回起動：全英検3級単語を事前登録
      const initialData = {};
      
      eiken3Words.forEach(word => {
        initialData[word.id] = {
          // 基本情報
          id: word.id,
          word: word.word,
          meaning: word.meaning,
          partOfSpeech: word.partOfSpeech,
          difficulty: word.difficulty,
          level: 'eiken3',
          
          // 学習統計
          totalAttempts: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          accuracy: 0,
          
          // 学習状態
          status: LEARNING_STATUS.NOT_ENCOUNTERED,
          firstEncountered: null,
          lastSeen: null,
          
          // 復習スケジュール
          nextReview: null,
          reviewInterval: 1
        };
      });
      
      setLearningData(initialData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
    
    setIsInitialized(true);
  };

  // 学習記録の更新
  const recordLearningAttempt = (wordId, isCorrect) => {
    setLearningData(prevData => {
      const wordData = prevData[wordId];
      if (!wordData) return prevData;

      const now = new Date().toISOString();
      const newTotalAttempts = wordData.totalAttempts + 1;
      const newCorrectAnswers = wordData.correctAnswers + (isCorrect ? 1 : 0);
      const newWrongAnswers = wordData.wrongAnswers + (isCorrect ? 0 : 1);
      const newAccuracy = Math.round((newCorrectAnswers / newTotalAttempts) * 100);
      
      const updatedWordData = {
        ...wordData,
        totalAttempts: newTotalAttempts,
        correctAnswers: newCorrectAnswers,
        wrongAnswers: newWrongAnswers,
        accuracy: newAccuracy,
        status: calculateMasteryLevel(newCorrectAnswers, newTotalAttempts),
        firstEncountered: wordData.firstEncountered || now,
        lastSeen: now
      };

      const updatedData = {
        ...prevData,
        [wordId]: updatedWordData
      };

      // LocalStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      
      return updatedData;
    });
  };

  // 学習統計の計算
  const getLearningStats = () => {
    const words = Object.values(learningData);
    
    const totalWords = words.length;
    const encounteredWords = words.filter(w => w.status !== LEARNING_STATUS.NOT_ENCOUNTERED).length;
    const learningWords = words.filter(w => w.status === LEARNING_STATUS.LEARNING).length;
    const masteredWords = words.filter(w => w.status === LEARNING_STATUS.MASTERED).length;
    
    const totalAttempts = words.reduce((sum, w) => sum + w.totalAttempts, 0);
    const totalCorrect = words.reduce((sum, w) => sum + w.correctAnswers, 0);
    const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    
    return {
      totalWords,
      encounteredWords,
      learningWords,
      masteredWords,
      notEncounteredWords: totalWords - encounteredWords,
      overallAccuracy,
      totalAttempts,
      completionRate: Math.round((masteredWords / totalWords) * 100)
    };
  };

  // 復習が必要な単語を取得
  const getWordsNeedingReview = () => {
    return Object.values(learningData).filter(word => {
      if (word.status === LEARNING_STATUS.NOT_ENCOUNTERED) return false;
      if (word.status === LEARNING_STATUS.MASTERED) return false;
      
      // 学習中の単語で、正答率が低い単語を優先
      return word.accuracy < 70;
    });
  };

  // カスタム単語の追加
  const addCustomWord = (wordData) => {
    const customId = `custom_${Date.now()}`;
    const newWordData = {
      id: customId,
      ...wordData,
      level: 'custom',
      totalAttempts: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      accuracy: 0,
      status: LEARNING_STATUS.NOT_ENCOUNTERED,
      firstEncountered: null,
      lastSeen: null,
      nextReview: null,
      reviewInterval: 1,
      isCustom: true
    };

    setLearningData(prevData => {
      const updatedData = {
        ...prevData,
        [customId]: newWordData
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      return updatedData;
    });

    return customId;
  };

  // 初期化
  useEffect(() => {
    initializeLearningData();
  }, []);

  return {
    learningData,
    isInitialized,
    recordLearningAttempt,
    getLearningStats,
    getWordsNeedingReview,
    addCustomWord,
    LEARNING_STATUS
  };
};
