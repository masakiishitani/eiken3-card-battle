#!/usr/bin/env python3
"""
Supabase RLS (Row Level Security) を再有効化し、適切なセキュリティポリシーを設定するスクリプト
"""

import os
from supabase import create_client, Client

def main():
    # Supabase設定
    url = os.getenv('SUPABASE_URL')
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')  # サービスロールキーが必要
    
    if not url or not key:
        print("エラー: SUPABASE_URLとSUPABASE_SERVICE_ROLE_KEYの環境変数が必要です")
        print("現在のキーはanon keyのため、RLS設定にはservice_role keyが必要です")
        return
    
    try:
        # Supabaseクライアント作成
        supabase: Client = create_client(url, key)
        
        print("Supabaseに接続中...")
        
        # RLSを有効化
        print("1. RLS (Row Level Security) を有効化中...")
        rls_result = supabase.postgrest.rpc('enable_rls_on_words').execute()
        print("RLS有効化完了")
        
        # 読み取り専用ポリシーを作成（全ユーザーが単語データを読み取り可能）
        print("2. 読み取り専用ポリシーを作成中...")
        read_policy_sql = """
        CREATE POLICY "Allow public read access on words" 
        ON words FOR SELECT 
        USING (true);
        """
        
        # 注意: postgrestではDDL文を直接実行できないため、
        # 実際の本番環境ではSupabase Dashboardまたは別の方法でポリシーを設定する必要があります
        print("注意: ポリシーの作成はSupabase Dashboardで手動で行う必要があります")
        print("以下のSQLをSupabase Dashboard > SQL Editorで実行してください:")
        print(read_policy_sql)
        
        print("\n3. 現在のテーブル情報を確認中...")
        # テーブルの情報を確認
        result = supabase.table('words').select('count').execute()
        print(f"words テーブルのレコード数: {len(result.data) if result.data else 0}")
        
        print("\nRLS設定プロセス完了")
        print("手動でSupabase Dashboardにて以下を実行してください:")
        print("1. Authentication > Settings > RLS を確認")
        print("2. Database > Tables > words > RLS policies で読み取りポリシーを追加")
        
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        print("anon keyではRLS設定ができません。service_role keyが必要です。")

if __name__ == "__main__":
    main()

