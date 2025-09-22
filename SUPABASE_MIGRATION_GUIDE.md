# 英検3級カードバトル Supabase移行ガイド

## はじめに

このドキュメントは、英検3級カードバトルゲームの単語データを静的JavaScriptファイルからSupabaseデータベースに移行するプロセスを詳細に説明します。この移行により、データ管理の柔軟性とスケーラビリティが大幅に向上します。

## 移行の背景と目的

### 移行前の課題
- 静的ファイルによる単語データ管理の限界
- データの追加・更新時のデプロイが必要
- ユーザー進捗データの永続化が困難
- 複数のデータソースとの統合が困難

### 移行後のメリット
- リアルタイムでのデータ更新が可能
- ユーザー進捗の永続化
- 管理画面での簡単なデータ管理
- 将来的な機能拡張への対応

## 技術仕様

### 使用技術
- **データベース**: Supabase (PostgreSQL)
- **フロントエンド**: React + Vite
- **認証**: Supabase Auth (将来実装予定)
- **API**: Supabase REST API

### データベース設計

#### wordsテーブル
```sql
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  meaning TEXT NOT NULL,
  part_of_speech VARCHAR(50) NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
  attack INTEGER NOT NULL DEFAULT 0,
  defense INTEGER NOT NULL DEFAULT 0,
  mana_cost INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 移行プロセス

### フェーズ1: データベースセットアップ

#### 1.1 Supabaseプロジェクト作成
1. https://supabase.com でアカウント作成
2. 新しいプロジェクト「eiken3-card-battle」を作成
3. プロジェクトURL と API キーを取得

#### 1.2 データベーステーブル作成
```sql
-- wordsテーブルの作成
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  meaning TEXT NOT NULL,
  part_of_speech VARCHAR(50) NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
  attack INTEGER NOT NULL DEFAULT 0,
  defense INTEGER NOT NULL DEFAULT 0,
  mana_cost INTEGER NOT NULL DEFAULT 0
);

-- 一時的にRLSを無効化（データインポート用）
ALTER TABLE words DISABLE ROW LEVEL SECURITY;
```

### フェーズ2: データインポート

#### 2.1 既存データの準備
既存の `extendedWordData.js` から単語データを抽出し、重複IDを解決します。

#### 2.2 インポートスクリプトの実行
```python
# import_words_to_supabase.py を実行
python3 import_words_to_supabase.py
```

結果: 212個の単語データが正常にインポートされました。

### フェーズ3: アプリケーション統合

#### 3.1 Supabaseクライアント設定
```javascript
// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mqynayequlniqltafzly.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### 3.2 サービス層の実装
- `wordService.js`: 単語データの取得
- `deckService.js`: デッキ構築ロジック

#### 3.3 ゲームコンテキストの更新
GameContextでSupabaseからのデータ取得に対応し、ローディング状態を適切に管理します。

### フェーズ4: セキュリティ設定

#### 4.1 Row Level Security (RLS) の有効化
```sql
-- RLSを有効化
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- 読み取り専用ポリシーを作成
CREATE POLICY "Allow public read access on words" 
ON words FOR SELECT 
USING (true);
```

## 実装詳細

### 作成されたファイル

#### バックエンド関連
- `src/supabaseClient.js` - Supabaseクライアント設定
- `src/services/wordService.js` - 単語データ取得サービス
- `src/services/deckService.js` - デッキ構築サービス
- `supabase_schema.sql` - データベーススキーマ定義

#### フロントエンド関連
- `src/components/LoadingScreen.jsx` - ローディング画面コンポーネント
- 修正: `src/contexts/GameContext.jsx` - Supabase統合対応
- 修正: `src/components/GameBoard.jsx` - ローディング状態処理

#### ユーティリティ
- `import_words_to_supabase.py` - データインポートスクリプト
- `enable_rls_and_policies.py` - RLS設定スクリプト
- `debug.html` - Supabase接続テスト用ファイル

### 主要な実装パターン

#### 非同期データ取得
```javascript
// wordService.js
export const fetchAllWords = async () => {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .order('id');
  
  if (error) throw error;
  return data;
};
```

#### エラーハンドリングとフォールバック
```javascript
// GameContext.jsx
const initializeGame = async () => {
  try {
    const player1Deck = await buildRecommendedDeckFromSupabase(1);
    // Supabaseからデッキを構築
  } catch (error) {
    console.error('Error initializing game:', error);
    // 静的データにフォールバック
    const { buildRecommendedDeck } = await import('../data/extendedWordData.js');
    const player1Deck = buildRecommendedDeck(1);
  }
};
```

## 現在の状況と課題

### 完了した作業
- ✅ Supabaseプロジェクトとデータベースのセットアップ
- ✅ 212個の単語データの正常なインポート
- ✅ Supabase接続テストの成功
- ✅ サービス層の実装
- ✅ RLS設定手順書の作成
- ✅ GitHubブランチでの変更管理

### 現在の課題
- ❌ Reactアプリケーションの表示問題
- ❌ ローディング状態の適切な処理
- ⚠️ RLS設定の手動実行が必要

### 技術的な発見
1. **Supabase接続は正常**: 独立したHTMLファイルでの接続テストは成功
2. **データインポートは完璧**: 全212個の単語が正しい形式で格納
3. **表示問題はSupabase統合とは独立**: 静的データに戻しても同様の問題が発生

## 次のステップ

### 短期的な対応
1. **Reactアプリケーションの表示問題の解決**
   - コンポーネントの依存関係確認
   - ビルド設定の見直し
   - CSS/スタイリングの問題調査

2. **Supabase統合の完了**
   - 表示問題解決後のSupabaseデータ取得への切り替え
   - ローディング状態の最適化

### 中期的な拡張
1. **ユーザー認証の実装**
   - Supabase Authの統合
   - ユーザー固有の進捗データ

2. **管理機能の追加**
   - 単語データの管理画面
   - 学習統計の可視化

### 長期的な展望
1. **マルチプレイヤー機能**
   - リアルタイム対戦
   - ランキングシステム

2. **AI機能の強化**
   - 個人化された学習推奨
   - 動的難易度調整

## トラブルシューティング

### よくある問題と解決方法

#### 1. Supabase接続エラー
```javascript
// 解決方法: APIキーとURLの確認
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key'; // service_role_keyではなくanon_keyを使用
```

#### 2. RLSによるアクセス拒否
```sql
-- 解決方法: 適切なポリシーの設定
CREATE POLICY "Allow public read access" 
ON words FOR SELECT 
USING (true);
```

#### 3. データ型の不一致
```javascript
// 解決方法: データ変換の実装
const processWordData = (rawData) => {
  return rawData.map(word => ({
    ...word,
    attack: parseInt(word.attack) || 0,
    defense: parseInt(word.defense) || 0,
    mana_cost: parseInt(word.mana_cost) || 0
  }));
};
```

## 参考資料

### 公式ドキュメント
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

### プロジェクト固有のリソース
- GitHub Repository: https://github.com/masakiishitani/eiken3-card-battle
- Supabase Project: https://mqynayequlniqltafzly.supabase.co

## 制作者情報

このプロジェクトは [@masakiishitani](https://x.com/masakiishitani) によって開発され、Manusによって移行作業が実施されました。

---

*このドキュメントは移行プロセスの完全な記録として作成されており、同様のプロジェクトでの参考資料として活用できます。*

