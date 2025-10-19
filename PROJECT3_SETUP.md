# Project3 での RPG Maker MZ MCP サーバー設定ガイド

このガイドでは、`C:\Users\PC_User\OneDrive\ドキュメント\RMMZ\Project3` で RPG Maker MZ MCP サーバーを使用する方法を説明します。

## 前提条件

✅ Project3 は有効な RPG Maker MZ プロジェクトです（確認済み）
✅ MCP サーバーは既にビルド済みです

## 設定手順

### ステップ 1: Claude Desktop 設定ファイルを開く

Windows の場合、以下の場所にある設定ファイルを開きます：

```
%APPDATA%\Claude\claude_desktop_config.json
```

または直接パスで：
```
C:\Users\PC_User\AppData\Roaming\Claude\claude_desktop_config.json
```

**ファイルが存在しない場合は新規作成してください。**

### ステップ 2: 設定を追加

以下の内容を設定ファイルに追加します：

```json
{
  "mcpServers": {
    "rpgmaker-project3": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/Users/PC_User/OneDrive/ドキュメント/RMMZ/Project3"
      }
    }
  }
}
```

**重要なポイント**:
- パスの区切りは `/`（フォワードスラッシュ）を使用
- 日本語を含むパスも正しく動作します
- サーバー名は `rpgmaker-project3` としていますが、任意の名前に変更可能

### ステップ 3: 複数プロジェクトを使用する場合

複数の RPG Maker MZ プロジェクトを同時に管理したい場合は、以下のように設定します：

```json
{
  "mcpServers": {
    "rpgmaker-project3": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/Users/PC_User/OneDrive/ドキュメント/RMMZ/Project3"
      }
    },
    "rpgmaker-other-project": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/path/to/other/project"
      }
    }
  }
}
```

この設定により、Claude に「rpgmaker-project3 を使って...」と指示することで、どのプロジェクトを操作するか指定できます。

### ステップ 4: Claude Desktop を再起動

設定ファイルを保存した後、Claude Desktop を**完全に終了**してから再起動してください。

1. Claude Desktop を右クリック → 終了
2. Claude Desktop を再度起動

### ステップ 5: 動作確認

Claude Desktop で新しい会話を開始し、以下を試してください：

```
Project3 のゲームタイトルを教えて
```

または

```
Project3 の全アクターを表示して
```

成功すると、Claude が MCP サーバーを使用して Project3 のデータを取得し、表示します。

## 使用例

### 例 1: ゲーム情報の確認

**あなた**: 「Project3 にはどんなアクターがいる？」

**Claude**: `get_actors` ツールを使用して全アクターを表示

### 例 2: データの更新

**あなた**: 「Project3 のゲームタイトルを『伝説の冒険』に変更して」

**Claude**: `update_game_title` ツールを使用してタイトルを更新

### 例 3: マップの確認

**あなた**: 「Project3 のマップ1にあるイベントを全て表示して」

**Claude**: `get_map_events` ツールを使用してイベント一覧を表示

### 例 4: アイテム管理

**あなた**: 「Project3 の全アイテムをリストアップして、価格順に並べて」

**Claude**: `get_items` ツールを使用し、価格順に整理して表示

## 安全な使用方法

### ⚠️ 重要な注意事項

1. **バックアップを取る**: 変更を加える前に Project3 フォルダ全体をバックアップ
2. **RPG Maker MZ を閉じる**: MCP サーバー使用中は RPG Maker MZ エディタを閉じてください
3. **変更後の確認**: 変更後は RPG Maker MZ エディタで開いて動作確認

### 推奨ワークフロー

```
1. RPG Maker MZ エディタを閉じる
2. Project3 フォルダをバックアップ（任意だが推奨）
3. Claude Desktop で MCP サーバー経由で変更
4. RPG Maker MZ エディタで開いて確認
5. ゲームをテストプレイ
```

## トラブルシューティング

### 問題: "rpgmaker-project3 server not found"

**解決方法**:
1. `claude_desktop_config.json` のパスが正しいか確認
2. JSON の構文エラーがないか確認（カンマの位置など）
3. Claude Desktop を再起動

### 問題: "Invalid RPG Maker MZ project path"

**解決方法**:
1. パスが正しいか確認: `C:/Users/PC_User/OneDrive/ドキュメント/RMMZ/Project3`
2. `game.rmmzproject` と `data/System.json` が存在するか確認
3. パスにバックスラッシュ (`\`) ではなくフォワードスラッシュ (`/`) を使用

### 問題: ツールは動作するが変更が保存されない

**解決方法**:
1. RPG Maker MZ エディタが開いていないか確認
2. Project3 フォルダの書き込み権限を確認
3. ファイルが読み取り専用になっていないか確認

## 設定ファイルの完全な例

以下は、Project3 のみを使用する場合の完全な設定ファイル例です：

**ファイル**: `C:\Users\PC_User\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rpgmaker-project3": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/Users/PC_User/OneDrive/ドキュメント/RMMZ/Project3"
      }
    }
  }
}
```

**注意**: 既に他の MCP サーバーが設定されている場合は、`mcpServers` セクションに追加してください。

## よくある質問

### Q: 複数のプロジェクトを同時に編集できますか？

A: はい。上記の「複数プロジェクトを使用する場合」の設定を参照してください。

### Q: MCP サーバーを使うと元のデータは消えますか？

A: いいえ。MCP サーバーは JSON ファイルを直接編集するだけです。ただし、バックアップは推奨します。

### Q: RPG Maker MZ エディタと同時に使えますか？

A: 推奨しません。ファイルの競合が発生する可能性があります。どちらか一方を使用してください。

### Q: Node.js がインストールされていない場合は？

A: Node.js (v18以上) をインストールする必要があります。
   https://nodejs.org/ からダウンロードしてインストールしてください。

## 次のステップ

1. ✅ この設定ガイドに従って設定
2. ✅ 動作確認テスト
3. 📖 [EXAMPLES.md](EXAMPLES.md) で具体的な使用例を確認
4. 🚀 Project3 の開発を効率化！

## サポート

問題が発生した場合は、以下を確認してください：

1. [README.md](README.md) - 機能概要
2. [SETUP.md](SETUP.md) - 一般的なセットアップ手順
3. [EXAMPLES.md](EXAMPLES.md) - 使用例

---

**設定完了後、すぐに使えます！**

Project3 での RPG 制作を楽しんでください！
