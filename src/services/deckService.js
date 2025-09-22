import { fetchAllWords } from './wordService.js';
import { calculateBalancedCardStats } from '../data/extendedWordData.js';

// Supabaseから取得した単語データを使用して推奨デッキを構築する関数
export const buildRecommendedDeckFromSupabase = async (playerLevel = 1) => {
  try {
    // Supabaseから全ての単語を取得
    const words = await fetchAllWords();
    
    const deckSize = 20;
    const difficultyDistribution = {
      1: 0.5,  // 50%
      2: 0.3,  // 30%
      3: 0.2   // 20%
    };

    const partOfSpeechDistribution = {
      'noun': 0.4,      // 40%
      'verb': 0.25,     // 25%
      'adjective': 0.2, // 20%
      'adverb': 0.1,    // 10%
      'preposition': 0.03, // 3%
      'number': 0.02    // 2%
    };

    const deck = [];
    const usedWords = new Set();

    // 難易度別に単語を分類
    const wordsByDifficulty = {
      1: words.filter(w => w.difficulty === 1),
      2: words.filter(w => w.difficulty === 2),
      3: words.filter(w => w.difficulty === 3)
    };

    // 品詞別に単語を分類
    const wordsByPartOfSpeech = {};
    Object.keys(partOfSpeechDistribution).forEach(pos => {
      wordsByPartOfSpeech[pos] = words.filter(w => w.partOfSpeech === pos);
    });

    // 難易度分布に基づいてデッキを構築
    Object.entries(difficultyDistribution).forEach(([difficulty, ratio]) => {
      const count = Math.floor(deckSize * ratio);
      const wordsOfDifficulty = wordsByDifficulty[difficulty];
      
      for (let i = 0; i < count && wordsOfDifficulty.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * wordsOfDifficulty.length);
        const selectedWord = wordsOfDifficulty[randomIndex];
        
        if (!usedWords.has(selectedWord.id)) {
          const stats = calculateBalancedCardStats(selectedWord);
          deck.push({
            ...selectedWord,
            ...stats
          });
          usedWords.add(selectedWord.id);
          wordsOfDifficulty.splice(randomIndex, 1);
        }
      }
    });

    // 残りの枠を埋める
    while (deck.length < deckSize && words.length > usedWords.size) {
      const remainingWords = words.filter(w => !usedWords.has(w.id));
      if (remainingWords.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      const selectedWord = remainingWords[randomIndex];
      const stats = calculateBalancedCardStats(selectedWord);
      
      deck.push({
        ...selectedWord,
        ...stats
      });
      usedWords.add(selectedWord.id);
    }

    return deck;
  } catch (error) {
    console.error('Error building deck from Supabase:', error);
    // フォールバック: 静的データを使用
    const { buildRecommendedDeck } = await import('../data/extendedWordData.js');
    return buildRecommendedDeck(playerLevel);
  }
};

