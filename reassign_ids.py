
import json
import re

def reassign_ids():
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

    # IDを振り直す
    for i, word_entry in enumerate(words_data):
        word_entry["id"] = i + 1

    # 修正されたデータを新しいJavaScript形式の文字列に変換
    new_js_content = "export const extendedEiken3Words = [\n"
    for i, entry in enumerate(words_data):
        # JSON.dumpsで出力されるキーのダブルクォーテーションを削除し、JSのオブジェクトリテラル形式に戻す
        entry_str = json.dumps(entry, ensure_ascii=False)
        entry_str = re.sub(r'"([a-zA-Z_][a-zA-Z0-9_]*)":', r'\1:', entry_str)
        new_js_content += f"  {entry_str}"
        if i < len(words_data) - 1:
            new_js_content += ",\n"
        else:
            new_js_content += "\n"
    new_js_content += "];\n"

    # ファイルに書き戻す
    with open("/home/ubuntu/eiken3-card-battle/src/data/extendedWordData.js", "w", encoding="utf-8") as f:
        f.write(new_js_content)
    print("IDs reassigned and extendedWordData.js updated successfully.")

if __name__ == "__main__":
    reassign_ids()


