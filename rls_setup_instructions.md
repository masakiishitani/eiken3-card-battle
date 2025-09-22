# Supabase RLS (Row Level Security) 設定手順

## 概要
英検3級カードバトルゲームのSupabaseデータベースにRow Level Security (RLS) を設定し、適切なセキュリティポリシーを適用する手順です。

## 前提条件
- Supabaseプロジェクトへの管理者アクセス権限
- プロジェクトURL: https://mqynayequlniqltafzly.supabase.co

## 手順

### 1. Supabase Dashboardにアクセス
1. https://supabase.com にアクセス
2. プロジェクト「eiken3-card-battle」を選択
3. 左側メニューから「Database」を選択

### 2. RLSの有効化
1. 「Tables」タブを選択
2. 「words」テーブルを見つける
3. テーブル名の右側にある「...」メニューをクリック
4. 「Edit table」を選択
5. 「Enable RLS」をオンにする
6. 「Save」をクリック

### 3. 読み取り専用ポリシーの作成
1. 「words」テーブルの詳細画面で「RLS policies」タブを選択
2. 「New Policy」をクリック
3. 「Create a policy from scratch」を選択
4. 以下の設定を入力:
   - **Policy name**: `Allow public read access on words`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `public`
   - **USING expression**: `true`
5. 「Review」をクリック
6. 「Save policy」をクリック

### 4. SQL Editorでの確認（オプション）
1. 左側メニューから「SQL Editor」を選択
2. 以下のSQLを実行してRLS状態を確認:

```sql
-- RLS状態の確認
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'words';

-- ポリシーの確認
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'words';
```

### 5. 動作確認
1. ゲームアプリケーションからデータ取得をテスト
2. 以下のJavaScriptコードをブラウザコンソールで実行:

```javascript
// Supabaseクライアントの作成（anon keyを使用）
const supabaseUrl = 'https://mqynayequlniqltafzly.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeW5heWVxdWxuaXFsdGFmemx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTI4MjQsImV4cCI6MjA3NDEyODgyNH0.RV5rzh63T2_ONA3MIh7K3XHW_Wj4pt4poesNnYda0aQ';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// データ取得テスト
supabase
  .from('words')
  .select('*')
  .limit(5)
  .then(({ data, error }) => {
    if (error) {
      console.error('エラー:', error);
    } else {
      console.log('データ取得成功:', data);
    }
  });
```

## セキュリティポリシーの詳細

### 現在のポリシー
- **読み取り専用アクセス**: 全ての匿名ユーザーが単語データを読み取り可能
- **書き込み制限**: データの追加・更新・削除は制限

### 将来の拡張案
必要に応じて以下のポリシーを追加可能:

1. **管理者専用書き込みポリシー**:
```sql
CREATE POLICY "Admin only write access on words" 
ON words FOR ALL 
USING (auth.role() = 'admin');
```

2. **ユーザー進捗データ用テーブル**:
```sql
-- ユーザーの学習進捗を記録するテーブル
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  word_id INTEGER REFERENCES words(id),
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP DEFAULT NOW()
);

-- ユーザー自身のデータのみアクセス可能
CREATE POLICY "Users can access own progress" 
ON user_progress FOR ALL 
USING (auth.uid() = user_id);
```

## トラブルシューティング

### よくある問題
1. **データが取得できない**: RLSが有効でポリシーが設定されていない
2. **権限エラー**: anon keyではなくservice_role keyを使用している
3. **ポリシーが適用されない**: ポリシーの条件式が正しくない

### 解決方法
1. ポリシーの`USING`条件を`true`に設定
2. anon keyを使用してテスト
3. SQL Editorでポリシーの存在を確認

## 完了チェックリスト
- [ ] RLSが有効化されている
- [ ] 読み取り専用ポリシーが作成されている
- [ ] ゲームアプリケーションからデータ取得が可能
- [ ] 不正な書き込みアクセスが制限されている

