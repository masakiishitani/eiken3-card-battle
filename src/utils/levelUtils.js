import { extendedEiken3Words, calculateBalancedCardStats } from '../data/extendedWordData';
import { eiken4Words, calculateEiken4CardStats } from '../data/eiken4WordData';

// レベル別の単語データを取得
export const getWordsByLevel = (level) => {
  switch (level) {
    case 'eiken4':
      return eiken4Words;
    case 'eiken3':
      return extendedEiken3Words;
    case 'mixed':
      return [...eiken4Words, ...extendedEiken3Words.map(word => ({ ...word, id: word.id + 1000 }))];
    default:
      return extendedEiken3Words;
  }
};

// レベル別のカード統計計算
export const calculateCardStatsByLevel = (word, level) => {
  switch (level) {
    case 'eiken4':
      return calculateEiken4CardStats(word);
    case 'eiken3':
      return calculateBalancedCardStats(word);
    case 'mixed':
      // 元のIDが1000以下なら基礎レベル、それ以上なら標準レベルとして処理
      if (word.id <= 1000) {
        return calculateEiken4CardStats(word);
      } else {
        return calculateBalancedCardStats({ ...word, id: word.id - 1000 });
      }
    default:
      return calculateBalancedCardStats(word);
  }
};

// レベル別の推奨デッキ構築
export const buildLevelBasedDeck = (level, playerLevel = 1) => {
  const deckSize = 30;
  const availableWords = getWordsByLevel(level);
  let selectedWords = [];
  
  // プレイヤーレベルに応じた難易度調整
  const maxDifficulty = Math.min(3, playerLevel + 1);
  const filteredWords = availableWords.filter(w => w.difficulty <= maxDifficulty);
  
  // 品詞バランス（動詞:名詞:形容詞:副詞 = 3:4:2:1）
  const verbCount = Math.floor(deckSize * 0.3);
  const nounCount = Math.floor(deckSize * 0.4);
  const adjectiveCount = Math.floor(deckSize * 0.2);
  const adverbCount = deckSize - verbCount - nounCount - adjectiveCount;
  
  // 各品詞から選択
  const verbs = filteredWords.filter(w => w.partOfSpeech === 'verb')
    .sort(() => 0.5 - Math.random()).slice(0, verbCount);
  const nouns = filteredWords.filter(w => w.partOfSpeech === 'noun')
    .sort(() => 0.5 - Math.random()).slice(0, nounCount);
  const adjectives = filteredWords.filter(w => w.partOfSpeech === 'adjective')
    .sort(() => 0.5 - Math.random()).slice(0, adjectiveCount);
  const adverbs = filteredWords.filter(w => w.partOfSpeech === 'adverb')
    .sort(() => 0.5 - Math.random()).slice(0, adverbCount);
  
  selectedWords = [...verbs, ...nouns, ...adjectives, ...adverbs];
  
  // 不足分を補完
  while (selectedWords.length < deckSize) {
    const remainingWords = filteredWords.filter(w => 
      !selectedWords.find(s => s.id === w.id)
    );
    if (remainingWords.length === 0) break;
    
    const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    selectedWords.push(randomWord);
  }
  
  // レベルに応じたカード統計を適用
  return selectedWords.map(word => calculateCardStatsByLevel(word, level));
};

// レベル情報を取得
export const getLevelInfo = (level) => {
  const levelData = {
    eiken4: {
      name: '基礎レベル',
      description: '英検4級相当',
      wordCount: 300,
      difficulty: 1,
      color: 'green'
    },
    eiken3: {
      name: '標準レベル',
      description: '英検3級相当',
      wordCount: 365,
      difficulty: 2,
      color: 'blue'
    },
    mixed: {
      name: '混合モード',
      description: '全レベル',
      wordCount: 665,
      difficulty: 3,
      color: 'purple'
    }
  };
  
  return levelData[level] || levelData.eiken3;
};

// ランダムな単語を取得（クイズ用）
export const getRandomWordByLevel = (level, excludeIds = []) => {
  const words = getWordsByLevel(level);
  const availableWords = words.filter(word => !excludeIds.includes(word.id));
  
  if (availableWords.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};

// 選択肢を生成（クイズ用）
export const generateChoicesByLevel = (correctWord, level, count = 4) => {
  const words = getWordsByLevel(level);
  const wrongChoices = words
    .filter(word => 
      word.id !== correctWord.id && 
      word.partOfSpeech === correctWord.partOfSpeech
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, count - 1)
    .map(word => word.meaning);
  
  const choices = [...wrongChoices, correctWord.meaning];
  return choices.sort(() => 0.5 - Math.random());
};
