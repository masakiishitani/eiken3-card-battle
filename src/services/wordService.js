import { supabase } from '../supabaseClient.js';

// Supabaseから全ての単語を取得
export const fetchAllWords = async () => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    // データベースのカラム名をゲームで使用する形式に変換
    const formattedWords = data.map(word => ({
      id: word.id,
      word: word.word,
      meaning: word.meaning,
      partOfSpeech: word.part_of_speech,
      difficulty: word.difficulty,
      attack: word.attack,
      defense: word.defense,
      manaCost: word.mana_cost
    }));

    return formattedWords;
  } catch (error) {
    console.error('Error fetching words from Supabase:', error);
    throw error;
  }
};

// 難易度別に単語を取得
export const fetchWordsByDifficulty = async (difficulty) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('difficulty', difficulty)
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    // データベースのカラム名をゲームで使用する形式に変換
    const formattedWords = data.map(word => ({
      id: word.id,
      word: word.word,
      meaning: word.meaning,
      partOfSpeech: word.part_of_speech,
      difficulty: word.difficulty,
      attack: word.attack,
      defense: word.defense,
      manaCost: word.mana_cost
    }));

    return formattedWords;
  } catch (error) {
    console.error('Error fetching words by difficulty from Supabase:', error);
    throw error;
  }
};

// 品詞別に単語を取得
export const fetchWordsByPartOfSpeech = async (partOfSpeech) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('part_of_speech', partOfSpeech)
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    // データベースのカラム名をゲームで使用する形式に変換
    const formattedWords = data.map(word => ({
      id: word.id,
      word: word.word,
      meaning: word.meaning,
      partOfSpeech: word.part_of_speech,
      difficulty: word.difficulty,
      attack: word.attack,
      defense: word.defense,
      manaCost: word.mana_cost
    }));

    return formattedWords;
  } catch (error) {
    console.error('Error fetching words by part of speech from Supabase:', error);
    throw error;
  }
};

// 特定のIDの単語を取得
export const fetchWordById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    // データベースのカラム名をゲームで使用する形式に変換
    const formattedWord = {
      id: data.id,
      word: data.word,
      meaning: data.meaning,
      partOfSpeech: data.part_of_speech,
      difficulty: data.difficulty,
      attack: data.attack,
      defense: data.defense,
      manaCost: data.mana_cost
    };

    return formattedWord;
  } catch (error) {
    console.error('Error fetching word by ID from Supabase:', error);
    throw error;
  }
};

