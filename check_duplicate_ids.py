
import json
import re
from collections import Counter

def check_duplicates():
    with open("/home/ubuntu/eiken3-card-battle/src/data/extendedWordData.js", "r", encoding="utf-8") as f:
        js_content = f.read()

    # コメントとJavaScriptのexport文を削除
    js_content = re.sub(r'//.*', '', js_content) # 行コメントを削除
    js_content = re.sub(r'/\*.*?\*/', '', js_content, flags=re.DOTALL) # ブロックコメントを削除

    # 不正なJSONの原因となる行を修正
    js_content = js_content.replace(
        'partOfSpeech: "adjective", difficulty: 3, meaning: "美しい"',
        'word: "beautiful", partOfSpeech: "adjective", difficulty: 3, meaning: "美しい"'
    )
    js_content = js_content.replace(
        'partOfSpeech: "noun", difficulty: 2, meaning: "運"',
        'word: "luck", partOfSpeech: "noun", difficulty: 2, meaning: "運"'
    )

    # JSON配列部分のみを正確に抽出
    match = re.search(r'export const extendedEiken3Words = (\s*\[[\s\S]*?\]);', js_content)
    if not match:
        print("Error: Could not find word data array in JavaScript content.")
        return
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
        error_line_start = max(0, e.pos - 50)
        error_line_end = min(len(json_str), e.pos + 50)
        print(f"Error context: {json_str[error_line_start:error_line_end]}")
        return

    ids = [word['id'] for word in words_data]
    duplicate_ids = [id for id, count in Counter(ids).items() if count > 1]

    if duplicate_ids:
        print(f"Duplicate IDs found: {duplicate_ids}")
        for dup_id in duplicate_ids:
            print(f"Entries with duplicate ID {dup_id}:")
            for word in words_data:
                if word['id'] == dup_id:
                    print(word)
    else:
        print("No duplicate IDs found.")

if __name__ == "__main__":
    check_duplicates()


