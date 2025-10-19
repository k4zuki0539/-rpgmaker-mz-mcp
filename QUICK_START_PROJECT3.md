# Project3 用クイックスタートガイド

## 確認済み情報

✅ **プロジェクトパス**: `C:\Users\PC_User\OneDrive\ドキュメント\RMMZ\Project3`
✅ **プロジェクト名**: Project3
✅ **アクター数**: 8人（リード、プリシア、ゲイル、ミシェル、アルベール、ケイシー、エリオット、ローザ）
✅ **パーティメンバー**: リード(1)、ミシェル(4)、ケイシー(6)、エリオット(7)
✅ **開始位置**: マップ1、座標(8, 6)

## 3ステップで設定完了

### ステップ 1: 設定ファイルを開く

以下のファイルを開きます（存在しない場合は作成）：

```
C:\Users\PC_User\AppData\Roaming\Claude\claude_desktop_config.json
```

### ステップ 2: この内容をコピー＆ペースト

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

**注意**: 既に他の MCP サーバーが設定されている場合は、`mcpServers` の中に `rpgmaker-project3` セクションを追加してください。

### ステップ 3: Claude Desktop を再起動

1. Claude Desktop を完全に終了
2. 再起動

## 動作確認

Claude に以下のように話しかけてみてください：

```
Project3 のゲーム情報を教えて
```

または

```
Project3 の全アクターをリストアップして
```

成功すると、以下のような情報が表示されます：

- ゲームタイトル: Project3
- アクター: リード、プリシア、ゲイル、ミシェル、アルベール、ケイシー、エリオット、ローザ
- 開始パーティ: リード、ミシェル、ケイシー、エリオット

## すぐに試せる指示例

### データ確認系

```
Project3 の全アイテムを表示して
```

```
Project3 のマップ1にあるイベントを教えて
```

```
Project3 の変数とスイッチの使用状況を確認して
```

### データ更新系（要注意：必ずバックアップを！）

```
Project3 のリード（アクター1）の初期レベルを5にして
```

```
Project3 のゲームタイトルを「伝説の冒険」に変更して
```

```
Project3 の全回復アイテムの価格を表示して
```

## 安全のための重要ルール

### 🔴 絶対に守ること

1. **RPG Maker MZ エディタを閉じる**
   - MCP サーバー使用中はエディタを開かないこと

2. **バックアップを取る**
   - 重要な変更前は Project3 フォルダ全体をコピー

3. **変更後は必ず確認**
   - 変更後、RPG Maker MZ で開いて動作確認

### 推奨ワークフロー

```
📁 Project3 をバックアップ
    ↓
❌ RPG Maker MZ エディタを閉じる
    ↓
💬 Claude Desktop で MCP サーバー経由で編集
    ↓
✅ RPG Maker MZ で開いて確認
    ↓
🎮 テストプレイで動作確認
```

## 実践例：アクターのレベル調整

### 1. 現状確認

**あなた**: 「Project3 のリードのステータスを教えて」

**Claude**: `get_actor` ツールで情報を表示
```json
{
  "id": 1,
  "name": "リード",
  "initialLevel": 1,
  "maxLevel": 99,
  ...
}
```

### 2. 変更実行

**あなた**: 「リードの初期レベルを5にして」

**Claude**: `update_actor` ツールで更新

### 3. 確認

**あなた**: 「もう一度リードのステータスを確認して」

**Claude**: 初期レベルが5に変更されたことを確認

## トラブルシューティング

### "server not found" エラー

→ Claude Desktop を完全に再起動してください

### "Invalid project path" エラー

→ パスが以下になっているか確認：
```
C:/Users/PC_User/OneDrive/ドキュメント/RMMZ/Project3
```
（スラッシュは `/` を使用）

### 変更が保存されない

→ RPG Maker MZ エディタを閉じてください

## より詳しい情報

- 📖 [PROJECT3_SETUP.md](PROJECT3_SETUP.md) - 詳細な設定ガイド
- 📖 [README.md](README.md) - 機能一覧
- 📖 [EXAMPLES.md](EXAMPLES.md) - 豊富な使用例

## 設定完了！

この設定で、Claude を使って Project3 を効率的に編集できます。

開発を楽しんでください！
