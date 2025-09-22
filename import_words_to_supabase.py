
import os
import json
import re
from supabase import create_client, Client

# SupabaseのURLとAPIキーを環境変数から取得
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set.")
    exit(1)

# Supabaseクライアントの初期化
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def import_words():
    # extendedWordData.jsからデータを読み込む
    with open("/home/ubuntu/eiken3-card-battle/src/data/extendedWordData.js", "r", encoding="utf-8") as f:
        js_content = f.read()

    # コメントとJavaScriptのexport文を削除
    js_content = re.sub(r'//.*', '', js_content) # 行コメントを削除
    js_content = re.sub(r'/\*.*?\*/', '', js_content, flags=re.DOTALL) # ブロックコメントを削除

    # 不正なJSONの原因となる行を修正
    # `partOfSpeech: "adjective", difficulty: 3, meaning: "美しい"` のような行で `word` が抜けている
    # `id: 96` の beautiful の修正
    js_content = js_content.replace(
        'partOfSpeech: "adjective", difficulty: 3, meaning: "美しい"',
        'word: "beautiful", partOfSpeech: "adjective", difficulty: 3, meaning: "美しい"'
    )
    # `id: 247` の luck の修正
    js_content = js_content.replace(
        'partOfSpeech: "noun", difficulty: 2, meaning: "運"',
        'word: "luck", partOfSpeech: "noun", difficulty: 2, meaning: "運"'
    )

    # JSON配列部分のみを正確に抽出
    match = re.search(r'export const extendedEiken3Words = (\s*\[[\s\S]*?\]);', js_content)
    if not match:
        print("Error: Could not find word data array in JavaScript content.")
        exit(1)
    json_str = match.group(1).strip()

    # キーをダブルクォーテーションで囲む
    json_str = re.sub(r'([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', json_str)
    # 文字列内のシングルクォーテーションをダブルクォーテーションに変換
    json_str = re.sub(r"'", r'"', json_str)
    # 最後の要素の後にカンマがある場合があるので削除
    json_str = re.sub(r',\s*\]', r']', json_str)

    try:
        words_data = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        # エラー箇所の特定
        error_line_start = max(0, e.pos - 50)
        error_line_end = min(len(json_str), e.pos + 50)
        print(f"Error context: {json_str[error_line_start:error_line_end]}")
        return

    print(f"Found {len(words_data)} words to import.")

    # 各単語にattack, defense, mana_costを追加し、キー名をデータベースに合わせる
    for word_entry in words_data:
        word_entry["attack"] = 0  # デフォルト値
        word_entry["defense"] = 0 # デフォルト値
        word_entry["mana_cost"] = 0 # デフォルト値
        # partOfSpeech を part_of_speech に変更
        if "partOfSpeech" in word_entry:
            word_entry["part_of_speech"] = word_entry.pop("partOfSpeech")

    # Supabaseにデータを挿入
    try:
        response = supabase.table("words").insert(words_data).execute()
        print("Data imported successfully:", response)
    except Exception as e:
        print("Error importing data:", e)

if __name__ == "__main__":
    import_words()


