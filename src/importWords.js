import { supabase } from './supabaseClient.js';
import { extendedEiken3Words } from './data/extendedWordData.js';

async function importWords() {
  console.log('Starting word import to Supabase...');
  let successCount = 0;
  let errorCount = 0;

  for (const wordData of extendedEiken3Words) {
    // Ensure all required fields are present and map to schema
    const { id, word, meaning, partOfSpeech, difficulty } = wordData;
    // Assign default attack, defense, mana_cost for now, these can be refined later
    const attack = wordData.attack || 5; 
    const defense = wordData.defense || 5;
    const mana_cost = wordData.mana_cost || 3;

    const { data, error } = await supabase
      .from('words')
      .insert([
        { 
          id: id, 
          word: word, 
          meaning: meaning, 
          part_of_speech: partOfSpeech, 
          difficulty: difficulty,
          attack: attack,
          defense: defense,
          mana_cost: mana_cost
        }
      ]);

    if (error) {
      console.error('Error inserting word:', word, error.message);
      errorCount++;
    } else {
      // console.log('Successfully inserted word:', word);
      successCount++;
    }
  }

  console.log(`Word import complete. Successfully inserted: ${successCount}, Errors: ${errorCount}`);
}

importWords();


