
import os
from supabase import create_client, Client

# SupabaseのURLとAPIキーを環境変数から取得
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set.")
    exit(1)

# Supabaseクライアントの初期化
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def delete_all_words():
    print("Deleting all words from Supabase \'words\' table...")
    try:
        # idがnullではないすべてのレコードを削除する条件を使用
        response = supabase.table("words").delete().not_.is_("id", "null").execute()
        print("All words deleted successfully:", response)
    except Exception as e:
        print("Error deleting data:", e)

if __name__ == "__main__":
    delete_all_words()


