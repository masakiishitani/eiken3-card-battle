// 標準レベルの英単語データ（英検3級相当）
export const extendedEiken3Words = [
  // 基本動詞 (30語)
  { id: 1, word: "be", meaning: "～である、いる", partOfSpeech: "verb", difficulty: 2 },
  { id: 2, word: "do", meaning: "する", partOfSpeech: "verb", difficulty: 2 },
  { id: 3, word: "have", meaning: "持つ", partOfSpeech: "verb", difficulty: 2 },
  { id: 4, word: "get", meaning: "得る、手に入れる", partOfSpeech: "verb", difficulty: 2 },
  { id: 5, word: "make", meaning: "作る", partOfSpeech: "verb", difficulty: 2 },
  { id: 6, word: "go", meaning: "行く", partOfSpeech: "verb", difficulty: 2 },
  { id: 7, word: "come", meaning: "来る", partOfSpeech: "verb", difficulty: 2 },
  { id: 8, word: "take", meaning: "取る", partOfSpeech: "verb", difficulty: 2 },
  { id: 9, word: "give", meaning: "与える", partOfSpeech: "verb", difficulty: 2 },
  { id: 10, word: "see", meaning: "見る", partOfSpeech: "verb", difficulty: 2 },
  { id: 11, word: "know", meaning: "知る", partOfSpeech: "verb", difficulty: 2 },
  { id: 12, word: "think", meaning: "考える", partOfSpeech: "verb", difficulty: 2 },
  { id: 13, word: "say", meaning: "言う", partOfSpeech: "verb", difficulty: 2 },
  { id: 14, word: "tell", meaning: "話す、教える", partOfSpeech: "verb", difficulty: 3 },
  { id: 15, word: "ask", meaning: "尋ねる", partOfSpeech: "verb", difficulty: 2 },
  { id: 16, word: "work", meaning: "働く", partOfSpeech: "verb", difficulty: 2 },
  { id: 17, word: "play", meaning: "遊ぶ", partOfSpeech: "verb", difficulty: 2 },
  { id: 18, word: "study", meaning: "勉強する", partOfSpeech: "verb", difficulty: 2 },
  { id: 19, word: "learn", meaning: "学ぶ", partOfSpeech: "verb", difficulty: 2 },
  { id: 20, word: "teach", meaning: "教える", partOfSpeech: "verb", difficulty: 3 },
  { id: 21, word: "read", meaning: "読む", partOfSpeech: "verb", difficulty: 2 },
  { id: 22, word: "write", meaning: "書く", partOfSpeech: "verb", difficulty: 2 },
  { id: 23, word: "listen", meaning: "聞く", partOfSpeech: "verb", difficulty: 2 },
  { id: 24, word: "speak", meaning: "話す", partOfSpeech: "verb", difficulty: 2 },
  { id: 25, word: "eat", meaning: "食べる", partOfSpeech: "verb", difficulty: 2 },
  { id: 26, word: "drink", meaning: "飲む", partOfSpeech: "verb", difficulty: 2 },
  { id: 27, word: "sleep", meaning: "眠る", partOfSpeech: "verb", difficulty: 2 },
  { id: 28, word: "walk", meaning: "歩く", partOfSpeech: "verb", difficulty: 2 },
  { id: 29, word: "run", meaning: "走る", partOfSpeech: "verb", difficulty: 2 },
  { id: 30, word: "swim", meaning: "泳ぐ", partOfSpeech: "verb", difficulty: 2 },
  { id: 31, word: "fly", meaning: "飛ぶ", partOfSpeech: "verb", difficulty: 3 },
  { id: 32, word: "drive", meaning: "運転する", partOfSpeech: "verb", difficulty: 3 },
  { id: 33, word: "ride", meaning: "乗る", partOfSpeech: "verb", difficulty: 3 },
  { id: 34, word: "visit", meaning: "訪問する", partOfSpeech: "verb", difficulty: 3 },
  { id: 35, word: "travel", meaning: "旅行する", partOfSpeech: "verb", difficulty: 3 },

  // 基本名詞 (40語)
  { id: 36, word: "time", meaning: "時間", partOfSpeech: "noun", difficulty: 2 },
  { id: 37, word: "year", meaning: "年", partOfSpeech: "noun", difficulty: 2 },
  { id: 38, word: "day", meaning: "日", partOfSpeech: "noun", difficulty: 2 },
  { id: 39, word: "week", meaning: "週", partOfSpeech: "noun", difficulty: 2 },
  { id: 40, word: "month", meaning: "月", partOfSpeech: "noun", difficulty: 2 },
  { id: 41, word: "hour", meaning: "時間", partOfSpeech: "noun", difficulty: 2 },
  { id: 42, word: "minute", meaning: "分", partOfSpeech: "noun", difficulty: 2 },
  { id: 43, word: "second", meaning: "秒", partOfSpeech: "noun", difficulty: 2 },
  { id: 44, word: "morning", meaning: "朝", partOfSpeech: "noun", difficulty: 2 },
  { id: 45, word: "afternoon", meaning: "午後", partOfSpeech: "noun", difficulty: 3 },
  { id: 46, word: "evening", meaning: "夕方", partOfSpeech: "noun", difficulty: 2 },
  { id: 47, word: "night", meaning: "夜", partOfSpeech: "noun", difficulty: 2 },
  { id: 48, word: "today", meaning: "今日", partOfSpeech: "noun", difficulty: 2 },
  { id: 49, word: "tomorrow", meaning: "明日", partOfSpeech: "noun", difficulty: 3 },
  { id: 50, word: "yesterday", meaning: "昨日", partOfSpeech: "noun", difficulty: 3 },
  { id: 51, word: "weekend", meaning: "週末", partOfSpeech: "noun", difficulty: 3 },
  { id: 52, word: "holiday", meaning: "休日", partOfSpeech: "noun", difficulty: 3 },
  { id: 53, word: "vacation", meaning: "休暇", partOfSpeech: "noun", difficulty: 3 },
  { id: 54, word: "school", meaning: "学校", partOfSpeech: "noun", difficulty: 2 },
  { id: 55, word: "class", meaning: "授業、クラス", partOfSpeech: "noun", difficulty: 2 },
  { id: 56, word: "student", meaning: "学生", partOfSpeech: "noun", difficulty: 2 },
  { id: 57, word: "teacher", meaning: "先生", partOfSpeech: "noun", difficulty: 2 },
  { id: 58, word: "book", meaning: "本", partOfSpeech: "noun", difficulty: 2 },
  { id: 59, word: "library", meaning: "図書館", partOfSpeech: "noun", difficulty: 3 },
  { id: 60, word: "hospital", meaning: "病院", partOfSpeech: "noun", difficulty: 3 },
  { id: 61, word: "station", meaning: "駅", partOfSpeech: "noun", difficulty: 3 },
  { id: 62, word: "restaurant", meaning: "レストラン", partOfSpeech: "noun", difficulty: 3 },
  { id: 63, word: "store", meaning: "店", partOfSpeech: "noun", difficulty: 2 },
  { id: 64, word: "market", meaning: "市場", partOfSpeech: "noun", difficulty: 3 },
  { id: 65, word: "office", meaning: "事務所", partOfSpeech: "noun", difficulty: 3 },
  { id: 66, word: "house", meaning: "家", partOfSpeech: "noun", difficulty: 2 },
  { id: 67, word: "home", meaning: "家庭", partOfSpeech: "noun", difficulty: 2 },
  { id: 68, word: "family", meaning: "家族", partOfSpeech: "noun", difficulty: 2 },
  { id: 69, word: "mother", meaning: "母", partOfSpeech: "noun", difficulty: 2 },
  { id: 70, word: "father", meaning: "父", partOfSpeech: "noun", difficulty: 2 },
  { id: 71, word: "brother", meaning: "兄弟", partOfSpeech: "noun", difficulty: 2 },
  { id: 72, word: "sister", meaning: "姉妹", partOfSpeech: "noun", difficulty: 2 },
  { id: 73, word: "friend", meaning: "友達", partOfSpeech: "noun", difficulty: 2 },
  { id: 74, word: "people", meaning: "人々", partOfSpeech: "noun", difficulty: 2 },
  { id: 75, word: "person", meaning: "人", partOfSpeech: "noun", difficulty: 2 },

  // 基本形容詞 (30語)
  { id: 76, word: "good", meaning: "良い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 77, word: "bad", meaning: "悪い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 78, word: "big", meaning: "大きい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 79, word: "small", meaning: "小さい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 80, word: "long", meaning: "長い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 81, word: "short", meaning: "短い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 82, word: "high", meaning: "高い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 83, word: "low", meaning: "低い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 84, word: "new", meaning: "新しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 85, word: "old", meaning: "古い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 86, word: "young", meaning: "若い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 87, word: "easy", meaning: "簡単な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 88, word: "difficult", meaning: "難しい", partOfSpeech: "adjective", difficulty: 3 },
  { id: 89, word: "hard", meaning: "難しい、固い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 90, word: "soft", meaning: "柔らかい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 91, word: "hot", meaning: "暑い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 92, word: "cold", meaning: "寒い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 93, word: "warm", meaning: "暖かい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 94, word: "cool", meaning: "涼しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 95, word: "nice", meaning: "素晴らしい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 96, word: "beautiful", meaning: "美しい", partOfSpeech: "adjective", difficulty: 3 },
  { id: 97, word: "happy", meaning: "幸せな", partOfSpeech: "adjective", difficulty: 2 },
  { id: 98, word: "sad", meaning: "悲しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 99, word: "angry", meaning: "怒った", partOfSpeech: "adjective", difficulty: 3 },
  { id: 100, word: "tired", meaning: "疲れた", partOfSpeech: "adjective", difficulty: 3 },
  { id: 101, word: "hungry", meaning: "お腹がすいた", partOfSpeech: "adjective", difficulty: 3 },
  { id: 102, word: "thirsty", meaning: "のどが渇いた", partOfSpeech: "adjective", difficulty: 3 },
  { id: 103, word: "busy", meaning: "忙しい", partOfSpeech: "adjective", difficulty: 3 },
  { id: 104, word: "free", meaning: "自由な、無料の", partOfSpeech: "adjective", difficulty: 3 },
  { id: 105, word: "important", meaning: "重要な", partOfSpeech: "adjective", difficulty: 3 },
  { id: 94, word: "angry", meaning: "怒った", partOfSpeech: "adjective", difficulty: 2 },
  { id: 95, word: "tired", meaning: "疲れた", partOfSpeech: "adjective", difficulty: 2 },
  { id: 96, word: "busy", meaning: "忙しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 97, word: "free", meaning: "自由な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 98, word: "fast", meaning: "速い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 99, word: "slow", meaning: "遅い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 100, word: "strong", meaning: "強い", partOfSpeech: "adjective", difficulty: 2 },

  // 基本副詞 (20語)
  { id: 101, word: "very", meaning: "とても", partOfSpeech: "adverb", difficulty: 1 },
  { id: 102, word: "well", meaning: "上手に", partOfSpeech: "adverb", difficulty: 2 },
  { id: 103, word: "quickly", meaning: "速く", partOfSpeech: "adverb", difficulty: 3 },
  { id: 104, word: "slowly", meaning: "遅く", partOfSpeech: "adverb", difficulty: 2 },
  { id: 105, word: "early", meaning: "早く", partOfSpeech: "adverb", difficulty: 2 },
  { id: 106, word: "late", meaning: "遅く", partOfSpeech: "adverb", difficulty: 2 },
  { id: 107, word: "soon", meaning: "すぐに", partOfSpeech: "adverb", difficulty: 2 },
  { id: 108, word: "now", meaning: "今", partOfSpeech: "adverb", difficulty: 1 },
  { id: 109, word: "then", meaning: "その時", partOfSpeech: "adverb", difficulty: 2 },
  { id: 110, word: "here", meaning: "ここに", partOfSpeech: "adverb", difficulty: 1 },
  { id: 111, word: "there", meaning: "そこに", partOfSpeech: "adverb", difficulty: 1 },
  { id: 112, word: "where", meaning: "どこに", partOfSpeech: "adverb", difficulty: 2 },
  { id: 113, word: "always", meaning: "いつも", partOfSpeech: "adverb", difficulty: 2 },
  { id: 114, word: "never", meaning: "決して～ない", partOfSpeech: "adverb", difficulty: 2 },
  { id: 115, word: "sometimes", meaning: "時々", partOfSpeech: "adverb", difficulty: 3 },
  { id: 116, word: "often", meaning: "しばしば", partOfSpeech: "adverb", difficulty: 2 },
  { id: 117, word: "usually", meaning: "普通は", partOfSpeech: "adverb", difficulty: 3 },
  { id: 118, word: "already", meaning: "すでに", partOfSpeech: "adverb", difficulty: 3 },
  { id: 119, word: "still", meaning: "まだ", partOfSpeech: "adverb", difficulty: 2 },
  { id: 120, word: "again", meaning: "再び", partOfSpeech: "adverb", difficulty: 2 },

  // 職業・人物 (20語)
  { id: 121, word: "doctor", meaning: "医者", partOfSpeech: "noun", difficulty: 2 },
  { id: 122, word: "nurse", meaning: "看護師", partOfSpeech: "noun", difficulty: 2 },
  { id: 123, word: "police", meaning: "警察", partOfSpeech: "noun", difficulty: 2 },
  { id: 124, word: "cook", meaning: "料理人", partOfSpeech: "noun", difficulty: 2 },
  { id: 125, word: "driver", meaning: "運転手", partOfSpeech: "noun", difficulty: 2 },
  { id: 126, word: "singer", meaning: "歌手", partOfSpeech: "noun", difficulty: 2 },
  { id: 127, word: "player", meaning: "選手", partOfSpeech: "noun", difficulty: 2 },
  { id: 128, word: "writer", meaning: "作家", partOfSpeech: "noun", difficulty: 2 },
  { id: 129, word: "artist", meaning: "芸術家", partOfSpeech: "noun", difficulty: 3 },
  { id: 130, word: "farmer", meaning: "農家", partOfSpeech: "noun", difficulty: 2 },
  { id: 131, word: "worker", meaning: "労働者", partOfSpeech: "noun", difficulty: 2 },
  { id: 132, word: "manager", meaning: "管理者", partOfSpeech: "noun", difficulty: 3 },
  { id: 133, word: "customer", meaning: "顧客", partOfSpeech: "noun", difficulty: 3 },
  { id: 134, word: "visitor", meaning: "訪問者", partOfSpeech: "noun", difficulty: 3 },
  { id: 135, word: "neighbor", meaning: "隣人", partOfSpeech: "noun", difficulty: 3 },
  { id: 136, word: "stranger", meaning: "見知らぬ人", partOfSpeech: "noun", difficulty: 3 },
  { id: 137, word: "child", meaning: "子供", partOfSpeech: "noun", difficulty: 2 },
  { id: 138, word: "baby", meaning: "赤ちゃん", partOfSpeech: "noun", difficulty: 2 },
  { id: 139, word: "boy", meaning: "男の子", partOfSpeech: "noun", difficulty: 1 },
  { id: 140, word: "girl", meaning: "女の子", partOfSpeech: "noun", difficulty: 1 },

  // 食べ物・飲み物 (20語)
  { id: 141, word: "food", meaning: "食べ物", partOfSpeech: "noun", difficulty: 2 },
  { id: 142, word: "water", meaning: "水", partOfSpeech: "noun", difficulty: 1 },
  { id: 143, word: "milk", meaning: "牛乳", partOfSpeech: "noun", difficulty: 2 },
  { id: 144, word: "coffee", meaning: "コーヒー", partOfSpeech: "noun", difficulty: 2 },
  { id: 145, word: "tea", meaning: "お茶", partOfSpeech: "noun", difficulty: 1 },
  { id: 146, word: "juice", meaning: "ジュース", partOfSpeech: "noun", difficulty: 2 },
  { id: 147, word: "bread", meaning: "パン", partOfSpeech: "noun", difficulty: 2 },
  { id: 148, word: "rice", meaning: "米", partOfSpeech: "noun", difficulty: 2 },
  { id: 149, word: "meat", meaning: "肉", partOfSpeech: "noun", difficulty: 2 },
  { id: 150, word: "fish", meaning: "魚", partOfSpeech: "noun", difficulty: 1 },
  { id: 151, word: "egg", meaning: "卵", partOfSpeech: "noun", difficulty: 1 },
  { id: 152, word: "apple", meaning: "りんご", partOfSpeech: "noun", difficulty: 2 },
  { id: 153, word: "orange", meaning: "オレンジ", partOfSpeech: "noun", difficulty: 2 },
  { id: 154, word: "banana", meaning: "バナナ", partOfSpeech: "noun", difficulty: 2 },
  { id: 155, word: "cake", meaning: "ケーキ", partOfSpeech: "noun", difficulty: 2 },
  { id: 156, word: "cookie", meaning: "クッキー", partOfSpeech: "noun", difficulty: 2 },
  { id: 157, word: "chocolate", meaning: "チョコレート", partOfSpeech: "noun", difficulty: 3 },
  { id: 158, word: "ice", meaning: "氷", partOfSpeech: "noun", difficulty: 1 },
  { id: 159, word: "sugar", meaning: "砂糖", partOfSpeech: "noun", difficulty: 2 },
  { id: 160, word: "salt", meaning: "塩", partOfSpeech: "noun", difficulty: 2 },

  // 動物 (15語)
  { id: 161, word: "dog", meaning: "犬", partOfSpeech: "noun", difficulty: 1 },
  { id: 162, word: "cat", meaning: "猫", partOfSpeech: "noun", difficulty: 1 },
  { id: 163, word: "bird", meaning: "鳥", partOfSpeech: "noun", difficulty: 2 },
  { id: 164, word: "fish", meaning: "魚", partOfSpeech: "noun", difficulty: 1 },
  { id: 165, word: "horse", meaning: "馬", partOfSpeech: "noun", difficulty: 2 },
  { id: 166, word: "cow", meaning: "牛", partOfSpeech: "noun", difficulty: 2 },
  { id: 167, word: "pig", meaning: "豚", partOfSpeech: "noun", difficulty: 2 },
  { id: 168, word: "sheep", meaning: "羊", partOfSpeech: "noun", difficulty: 2 },
  { id: 169, word: "chicken", meaning: "鶏", partOfSpeech: "noun", difficulty: 2 },
  { id: 170, word: "rabbit", meaning: "うさぎ", partOfSpeech: "noun", difficulty: 2 },
  { id: 171, word: "mouse", meaning: "ねずみ", partOfSpeech: "noun", difficulty: 2 },
  { id: 172, word: "elephant", meaning: "象", partOfSpeech: "noun", difficulty: 3 },
  { id: 173, word: "lion", meaning: "ライオン", partOfSpeech: "noun", difficulty: 2 },
  { id: 174, word: "tiger", meaning: "トラ", partOfSpeech: "noun", difficulty: 2 },
  { id: 175, word: "bear", meaning: "熊", partOfSpeech: "noun", difficulty: 2 },

  // 色・数字 (15語)
  { id: 176, word: "red", meaning: "赤い", partOfSpeech: "adjective", difficulty: 1 },
  { id: 177, word: "blue", meaning: "青い", partOfSpeech: "adjective", difficulty: 1 },
  { id: 178, word: "green", meaning: "緑の", partOfSpeech: "adjective", difficulty: 1 },
  { id: 179, word: "yellow", meaning: "黄色い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 180, word: "black", meaning: "黒い", partOfSpeech: "adjective", difficulty: 1 },
  { id: 181, word: "white", meaning: "白い", partOfSpeech: "adjective", difficulty: 1 },
  { id: 182, word: "brown", meaning: "茶色い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 183, word: "pink", meaning: "ピンクの", partOfSpeech: "adjective", difficulty: 2 },
  { id: 184, word: "purple", meaning: "紫の", partOfSpeech: "adjective", difficulty: 2 },
  { id: 185, word: "orange", meaning: "オレンジ色の", partOfSpeech: "adjective", difficulty: 2 },
  { id: 186, word: "one", meaning: "一つの", partOfSpeech: "adjective", difficulty: 1 },
  { id: 187, word: "two", meaning: "二つの", partOfSpeech: "adjective", difficulty: 1 },
  { id: 188, word: "three", meaning: "三つの", partOfSpeech: "adjective", difficulty: 1 },
  { id: 189, word: "many", meaning: "多くの", partOfSpeech: "adjective", difficulty: 2 },
  { id: 190, word: "few", meaning: "少しの", partOfSpeech: "adjective", difficulty: 2 },

  // スポーツ・趣味 (10語)
  { id: 191, word: "sport", meaning: "スポーツ", partOfSpeech: "noun", difficulty: 2 },
  { id: 192, word: "game", meaning: "ゲーム", partOfSpeech: "noun", difficulty: 2 },
  { id: 193, word: "music", meaning: "音楽", partOfSpeech: "noun", difficulty: 2 },
  { id: 194, word: "movie", meaning: "映画", partOfSpeech: "noun", difficulty: 2 },
  { id: 195, word: "picture", meaning: "写真", partOfSpeech: "noun", difficulty: 2 },
  { id: 196, word: "song", meaning: "歌", partOfSpeech: "noun", difficulty: 2 },
  { id: 197, word: "dance", meaning: "ダンス", partOfSpeech: "noun", difficulty: 2 },
  { id: 198, word: "party", meaning: "パーティー", partOfSpeech: "noun", difficulty: 2 },
  { id: 199, word: "hobby", meaning: "趣味", partOfSpeech: "noun", difficulty: 2 },
  { id: 200, word: "fun", meaning: "楽しい", partOfSpeech: "adjective", difficulty: 2 },

  // 追加の重要単語（重要度順）
  { id: 201, word: "build", meaning: "建てる、作る", partOfSpeech: "verb", difficulty: 3 },
  { id: 202, word: "health", meaning: "健康", partOfSpeech: "noun", difficulty: 3 },
  { id: 203, word: "prize", meaning: "賞、賞品", partOfSpeech: "noun", difficulty: 3 },
  { id: 204, word: "space", meaning: "宇宙、空間", partOfSpeech: "noun", difficulty: 3 },
  { id: 205, word: "accident", meaning: "事故", partOfSpeech: "noun", difficulty: 3 },
  { id: 206, word: "decide", meaning: "決める", partOfSpeech: "verb", difficulty: 3 },
  { id: 207, word: "reason", meaning: "理由", partOfSpeech: "noun", difficulty: 3 },
  { id: 208, word: "spend", meaning: "過ごす、使う", partOfSpeech: "verb", difficulty: 3 },
  { id: 209, word: "alone", meaning: "一人で", partOfSpeech: "adjective", difficulty: 3 },
  { id: 210, word: "enough", meaning: "十分な", partOfSpeech: "adjective", difficulty: 3 },
  { id: 211, word: "piece", meaning: "一つ、部分", partOfSpeech: "noun", difficulty: 3 },
  { id: 212, word: "sign", meaning: "看板、サイン", partOfSpeech: "noun", difficulty: 3 },
  { id: 213, word: "steal", meaning: "盗む", partOfSpeech: "verb", difficulty: 3 },
  { id: 214, word: "area", meaning: "区域、地域", partOfSpeech: "noun", difficulty: 3 },
  { id: 215, word: "save", meaning: "救う、保存する", partOfSpeech: "verb", difficulty: 3 },
  { id: 216, word: "able", meaning: "できる", partOfSpeech: "adjective", difficulty: 3 },
  { id: 217, word: "license", meaning: "免許証", partOfSpeech: "noun", difficulty: 3 },
  
  // 学校・教育関連
  { id: 218, word: "student", meaning: "学生", partOfSpeech: "noun", difficulty: 2 },
  { id: 219, word: "teacher", meaning: "先生", partOfSpeech: "noun", difficulty: 2 },
  { id: 220, word: "class", meaning: "授業、クラス", partOfSpeech: "noun", difficulty: 2 },
  { id: 221, word: "homework", meaning: "宿題", partOfSpeech: "noun", difficulty: 2 },
  { id: 222, word: "test", meaning: "テスト", partOfSpeech: "noun", difficulty: 2 },
  { id: 223, word: "exam", meaning: "試験", partOfSpeech: "noun", difficulty: 3 },
  { id: 224, word: "grade", meaning: "成績、学年", partOfSpeech: "noun", difficulty: 3 },
  { id: 225, word: "subject", meaning: "科目", partOfSpeech: "noun", difficulty: 3 },
  { id: 226, word: "library", meaning: "図書館", partOfSpeech: "noun", difficulty: 3 },
  { id: 227, word: "pencil", meaning: "鉛筆", partOfSpeech: "noun", difficulty: 2 },
  { id: 228, word: "pen", meaning: "ペン", partOfSpeech: "noun", difficulty: 2 },
  
  // 家族・人間関係
  { id: 229, word: "parent", meaning: "親", partOfSpeech: "noun", difficulty: 2 },
  { id: 230, word: "child", meaning: "子供", partOfSpeech: "noun", difficulty: 2 },
  { id: 231, word: "son", meaning: "息子", partOfSpeech: "noun", difficulty: 2 },
  { id: 232, word: "daughter", meaning: "娘", partOfSpeech: "noun", difficulty: 2 },
  { id: 233, word: "brother", meaning: "兄弟", partOfSpeech: "noun", difficulty: 2 },
  { id: 234, word: "sister", meaning: "姉妹", partOfSpeech: "noun", difficulty: 2 },
  { id: 235, word: "grandfather", meaning: "祖父", partOfSpeech: "noun", difficulty: 2 },
  { id: 236, word: "grandmother", meaning: "祖母", partOfSpeech: "noun", difficulty: 2 },
  { id: 237, word: "neighbor", meaning: "隣人", partOfSpeech: "noun", difficulty: 3 },
  
  // 食べ物・料理
  { id: 238, word: "meal", meaning: "食事", partOfSpeech: "noun", difficulty: 2 },
  { id: 239, word: "breakfast", meaning: "朝食", partOfSpeech: "noun", difficulty: 2 },
  { id: 240, word: "lunch", meaning: "昼食", partOfSpeech: "noun", difficulty: 2 },
  { id: 241, word: "dinner", meaning: "夕食", partOfSpeech: "noun", difficulty: 2 },
  { id: 242, word: "bread", meaning: "パン", partOfSpeech: "noun", difficulty: 2 },
  { id: 243, word: "rice", meaning: "米、ご飯", partOfSpeech: "noun", difficulty: 2 },
  { id: 244, word: "meat", meaning: "肉", partOfSpeech: "noun", difficulty: 2 },
  { id: 245, word: "vegetable", meaning: "野菜", partOfSpeech: "noun", difficulty: 2 },
  { id: 246, word: "fruit", meaning: "果物", partOfSpeech: "noun", difficulty: 2 },
  { id: 247, word: "banana", meaning: "バナナ", partOfSpeech: "noun", difficulty: 2 },
  { id: 248, word: "milk", meaning: "牛乳", partOfSpeech: "noun", difficulty: 2 },
  { id: 249, word: "coffee", meaning: "コーヒー", partOfSpeech: "noun", difficulty: 2 },
  { id: 250, word: "juice", meaning: "ジュース", partOfSpeech: "noun", difficulty: 2 },
  
  // 時間・日付
  { id: 251, word: "today", meaning: "今日", partOfSpeech: "noun", difficulty: 2 },
  { id: 252, word: "tomorrow", meaning: "明日", partOfSpeech: "noun", difficulty: 2 },
  { id: 253, word: "yesterday", meaning: "昨日", partOfSpeech: "noun", difficulty: 2 },
  { id: 254, word: "weekend", meaning: "週末", partOfSpeech: "noun", difficulty: 2 },
  { id: 255, word: "holiday", meaning: "休日", partOfSpeech: "noun", difficulty: 2 },
  { id: 256, word: "birthday", meaning: "誕生日", partOfSpeech: "noun", difficulty: 2 },
  { id: 257, word: "season", meaning: "季節", partOfSpeech: "noun", difficulty: 2 },
  
  // 場所・建物
  { id: 258, word: "house", meaning: "家", partOfSpeech: "noun", difficulty: 2 },
  { id: 259, word: "room", meaning: "部屋", partOfSpeech: "noun", difficulty: 2 },
  { id: 260, word: "kitchen", meaning: "台所", partOfSpeech: "noun", difficulty: 2 },
  { id: 261, word: "bedroom", meaning: "寝室", partOfSpeech: "noun", difficulty: 2 },
  { id: 262, word: "bathroom", meaning: "浴室", partOfSpeech: "noun", difficulty: 2 },
  { id: 263, word: "garden", meaning: "庭", partOfSpeech: "noun", difficulty: 2 },
  { id: 264, word: "hospital", meaning: "病院", partOfSpeech: "noun", difficulty: 2 },
  { id: 265, word: "store", meaning: "店", partOfSpeech: "noun", difficulty: 2 },
  { id: 266, word: "restaurant", meaning: "レストラン", partOfSpeech: "noun", difficulty: 2 },
  { id: 267, word: "station", meaning: "駅", partOfSpeech: "noun", difficulty: 2 },
  
  // 交通・移動
  { id: 268, word: "bus", meaning: "バス", partOfSpeech: "noun", difficulty: 2 },
  { id: 269, word: "train", meaning: "電車", partOfSpeech: "noun", difficulty: 2 },
  { id: 270, word: "plane", meaning: "飛行機", partOfSpeech: "noun", difficulty: 2 },
  { id: 271, word: "ship", meaning: "船", partOfSpeech: "noun", difficulty: 2 },
  { id: 272, word: "bike", meaning: "自転車", partOfSpeech: "noun", difficulty: 2 },
  { id: 273, word: "ticket", meaning: "切符", partOfSpeech: "noun", difficulty: 2 },
  { id: 274, word: "road", meaning: "道路", partOfSpeech: "noun", difficulty: 2 },
  { id: 275, word: "street", meaning: "通り", partOfSpeech: "noun", difficulty: 2 },
  
  // 数・量
  { id: 276, word: "number", meaning: "数", partOfSpeech: "noun", difficulty: 2 },
  { id: 277, word: "much", meaning: "多くの", partOfSpeech: "adjective", difficulty: 2 },
  { id: 278, word: "little", meaning: "少しの", partOfSpeech: "adjective", difficulty: 3 },
  { id: 279, word: "some", meaning: "いくつかの", partOfSpeech: "adjective", difficulty: 2 },
  { id: 280, word: "all", meaning: "全ての", partOfSpeech: "adjective", difficulty: 2 },
  { id: 281, word: "every", meaning: "全ての", partOfSpeech: "adjective", difficulty: 2 },
  
  // 感情・性格
  { id: 282, word: "happy", meaning: "幸せな", partOfSpeech: "adjective", difficulty: 2 },
  { id: 283, word: "sad", meaning: "悲しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 284, word: "angry", meaning: "怒った", partOfSpeech: "adjective", difficulty: 2 },
  { id: 285, word: "excited", meaning: "興奮した", partOfSpeech: "adjective", difficulty: 3 },
  { id: 286, word: "tired", meaning: "疲れた", partOfSpeech: "adjective", difficulty: 2 },
  { id: 287, word: "hungry", meaning: "お腹が空いた", partOfSpeech: "adjective", difficulty: 2 },
  { id: 288, word: "thirsty", meaning: "のどが渇いた", partOfSpeech: "adjective", difficulty: 2 },
  { id: 289, word: "sick", meaning: "病気の", partOfSpeech: "adjective", difficulty: 2 },
  { id: 290, word: "healthy", meaning: "健康な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 291, word: "kind", meaning: "親切な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 292, word: "nice", meaning: "良い、親切な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 293, word: "funny", meaning: "面白い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 294, word: "smart", meaning: "賢い", partOfSpeech: "adjective", difficulty: 2 },
  
  // 天気・自然
  { id: 295, word: "weather", meaning: "天気", partOfSpeech: "noun", difficulty: 2 },
  { id: 296, word: "sunny", meaning: "晴れた", partOfSpeech: "adjective", difficulty: 2 },
  { id: 297, word: "cloudy", meaning: "曇った", partOfSpeech: "adjective", difficulty: 2 },
  { id: 298, word: "rainy", meaning: "雨の", partOfSpeech: "adjective", difficulty: 2 },
  { id: 299, word: "snow", meaning: "雪", partOfSpeech: "noun", difficulty: 2 },
  { id: 300, word: "wind", meaning: "風", partOfSpeech: "noun", difficulty: 2 },
  { id: 301, word: "tree", meaning: "木", partOfSpeech: "noun", difficulty: 2 },
  { id: 302, word: "flower", meaning: "花", partOfSpeech: "noun", difficulty: 2 },
  { id: 303, word: "grass", meaning: "草", partOfSpeech: "noun", difficulty: 2 },
  { id: 304, word: "mountain", meaning: "山", partOfSpeech: "noun", difficulty: 2 },
  { id: 305, word: "river", meaning: "川", partOfSpeech: "noun", difficulty: 2 },
  { id: 306, word: "sea", meaning: "海", partOfSpeech: "noun", difficulty: 2 },
  { id: 307, word: "lake", meaning: "湖", partOfSpeech: "noun", difficulty: 2 },
  
  // 動作・動詞
  { id: 308, word: "help", meaning: "助ける", partOfSpeech: "verb", difficulty: 2 },
  { id: 309, word: "try", meaning: "試す", partOfSpeech: "verb", difficulty: 2 },
  { id: 310, word: "use", meaning: "使う", partOfSpeech: "verb", difficulty: 2 },
  { id: 311, word: "buy", meaning: "買う", partOfSpeech: "verb", difficulty: 2 },
  { id: 312, word: "sell", meaning: "売る", partOfSpeech: "verb", difficulty: 2 },
  { id: 313, word: "open", meaning: "開ける", partOfSpeech: "verb", difficulty: 2 },
  { id: 314, word: "close", meaning: "閉める", partOfSpeech: "verb", difficulty: 2 },
  { id: 315, word: "start", meaning: "始める", partOfSpeech: "verb", difficulty: 2 },
  { id: 316, word: "finish", meaning: "終える", partOfSpeech: "verb", difficulty: 2 },
  { id: 317, word: "stop", meaning: "止める", partOfSpeech: "verb", difficulty: 2 },
  { id: 318, word: "wait", meaning: "待つ", partOfSpeech: "verb", difficulty: 2 },
  { id: 319, word: "meet", meaning: "会う", partOfSpeech: "verb", difficulty: 2 },
  { id: 320, word: "call", meaning: "電話する", partOfSpeech: "verb", difficulty: 2 },
  { id: 321, word: "answer", meaning: "答える", partOfSpeech: "verb", difficulty: 2 },
  { id: 322, word: "look", meaning: "見る", partOfSpeech: "verb", difficulty: 2 },
  { id: 323, word: "watch", meaning: "見る", partOfSpeech: "verb", difficulty: 2 },
  { id: 324, word: "find", meaning: "見つける", partOfSpeech: "verb", difficulty: 2 },
  { id: 325, word: "lose", meaning: "失う", partOfSpeech: "verb", difficulty: 2 },
  { id: 326, word: "win", meaning: "勝つ", partOfSpeech: "verb", difficulty: 2 },
  { id: 327, word: "show", meaning: "見せる", partOfSpeech: "verb", difficulty: 2 },
  { id: 328, word: "turn", meaning: "回る", partOfSpeech: "verb", difficulty: 2 },
  { id: 329, word: "put", meaning: "置く", partOfSpeech: "verb", difficulty: 2 },
  { id: 330, word: "keep", meaning: "保つ", partOfSpeech: "verb", difficulty: 2 },
  { id: 331, word: "bring", meaning: "持ってくる", partOfSpeech: "verb", difficulty: 2 },
  { id: 332, word: "carry", meaning: "運ぶ", partOfSpeech: "verb", difficulty: 2 },
  { id: 333, word: "send", meaning: "送る", partOfSpeech: "verb", difficulty: 2 },
  { id: 334, word: "receive", meaning: "受け取る", partOfSpeech: "verb", difficulty: 3 },
  { id: 335, word: "remember", meaning: "覚えている", partOfSpeech: "verb", difficulty: 2 },
  { id: 336, word: "forget", meaning: "忘れる", partOfSpeech: "verb", difficulty: 2 },
  { id: 337, word: "hope", meaning: "望む", partOfSpeech: "verb", difficulty: 2 },
  { id: 338, word: "wish", meaning: "願う", partOfSpeech: "verb", difficulty: 2 },
  { id: 339, word: "want", meaning: "欲しい", partOfSpeech: "verb", difficulty: 2 },
  { id: 340, word: "need", meaning: "必要とする", partOfSpeech: "verb", difficulty: 2 },

  // 追加の重要形容詞
  { id: 341, word: "big", meaning: "大きい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 342, word: "small", meaning: "小さい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 343, word: "long", meaning: "長い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 344, word: "short", meaning: "短い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 345, word: "tall", meaning: "高い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 346, word: "low", meaning: "低い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 347, word: "fast", meaning: "速い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 348, word: "slow", meaning: "遅い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 349, word: "easy", meaning: "簡単な", partOfSpeech: "adjective", difficulty: 2 },
  { id: 350, word: "difficult", meaning: "難しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 351, word: "hard", meaning: "難しい、硬い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 352, word: "soft", meaning: "柔らかい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 353, word: "new", meaning: "新しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 354, word: "old", meaning: "古い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 355, word: "young", meaning: "若い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 356, word: "early", meaning: "早い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 357, word: "late", meaning: "遅い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 358, word: "good", meaning: "良い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 359, word: "bad", meaning: "悪い", partOfSpeech: "adjective", difficulty: 2 },
  { id: 360, word: "right", meaning: "正しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 361, word: "wrong", meaning: "間違った", partOfSpeech: "adjective", difficulty: 2 },
  { id: 362, word: "important", meaning: "重要な", partOfSpeech: "adjective", difficulty: 3 },
  { id: 363, word: "interesting", meaning: "面白い", partOfSpeech: "adjective", difficulty: 3 },
  { id: 364, word: "beautiful", meaning: "美しい", partOfSpeech: "adjective", difficulty: 2 },
  { id: 365, word: "clean", meaning: "きれいな", partOfSpeech: "adjective", difficulty: 2 }
];

// 難易度別の単語分布を分析
export const analyzeWordDistribution = () => {
  const distribution = {
    difficulty1: extendedEiken3Words.filter(w => w.difficulty === 1).length,
    difficulty2: extendedEiken3Words.filter(w => w.difficulty === 2).length,
    difficulty3: extendedEiken3Words.filter(w => w.difficulty === 3).length,
    verb: extendedEiken3Words.filter(w => w.partOfSpeech === 'verb').length,
    noun: extendedEiken3Words.filter(w => w.partOfSpeech === 'noun').length,
    adjective: extendedEiken3Words.filter(w => w.partOfSpeech === 'adjective').length,
    adverb: extendedEiken3Words.filter(w => w.partOfSpeech === 'adverb').length,
    total: extendedEiken3Words.length
  };
  
  return distribution;
};

// バランス調整されたカード統計計算
export const calculateBalancedCardStats = (word) => {
  let cost, attack, defense;

  // 基本値を調整してゲームをスピーディーに
  const baseAttack = 3;
  const baseDefense = 3;
  const baseCost = 2;

  switch (word.partOfSpeech) {
    case "verb":
      cost = Math.max(1, baseCost + Math.floor(word.difficulty * 0.5));
      attack = Math.max(1, baseAttack + word.difficulty * 1.5);
      defense = Math.max(1, baseDefense + word.difficulty * 0.5);
      break;
    case "noun":
      cost = Math.max(1, baseCost + Math.floor(word.difficulty * 0.3));
      attack = Math.max(1, baseAttack + word.difficulty * 0.5);
      defense = Math.max(1, baseDefense + word.difficulty * 1.5);
      break;
    case "adjective":
      cost = Math.max(1, baseCost + Math.floor(word.difficulty * 0.2));
      attack = Math.max(1, baseAttack + Math.floor(word.difficulty * 0.2));
      defense = Math.max(1, baseDefense + word.difficulty * 1.0);
      break;
    case "adverb":
      cost = Math.max(1, baseCost + Math.floor(word.difficulty * 0.1));
      attack = Math.max(1, baseAttack + word.difficulty * 1.0);
      defense = Math.max(1, baseDefense + Math.floor(word.difficulty * 0.2));
      break;
    default:
      cost = baseCost;
      attack = baseAttack;
      defense = baseDefense;
  }

  return { ...word, cost, attack, defense };
};

// レアリティシステム
export const getCardRarity = (word) => {
  if (word.difficulty >= 3) return 'rare';
  if (word.difficulty === 2) return 'common';
  return 'basic';
};

// デッキ構築用の推奨カード選択
export const buildRecommendedDeck = (playerLevel = 1) => {
  const deckSize = 30;
  let selectedWords = [];
  
  // プレイヤーレベルに応じた難易度調整
  const maxDifficulty = Math.min(3, playerLevel + 1);
  const availableWords = extendedEiken3Words.filter(w => w.difficulty <= maxDifficulty);
  
  // 品詞バランス（動詞:名詞:形容詞:副詞 = 3:4:2:1）
  const verbCount = Math.floor(deckSize * 0.3);
  const nounCount = Math.floor(deckSize * 0.4);
  const adjectiveCount = Math.floor(deckSize * 0.2);
  const adverbCount = deckSize - verbCount - nounCount - adjectiveCount;
  
  // 各品詞から選択
  const verbs = availableWords.filter(w => w.partOfSpeech === 'verb')
    .sort(() => 0.5 - Math.random()).slice(0, verbCount);
  const nouns = availableWords.filter(w => w.partOfSpeech === 'noun')
    .sort(() => 0.5 - Math.random()).slice(0, nounCount);
  const adjectives = availableWords.filter(w => w.partOfSpeech === 'adjective')
    .sort(() => 0.5 - Math.random()).slice(0, adjectiveCount);
  const adverbs = availableWords.filter(w => w.partOfSpeech === 'adverb')
    .sort(() => 0.5 - Math.random()).slice(0, adverbCount);
  
  selectedWords = [...verbs, ...nouns, ...adjectives, ...adverbs];
  
  return selectedWords.map(calculateBalancedCardStats);
};
