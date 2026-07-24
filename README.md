# PineDuck

自給自足プラットフォーム「PineDuck」のホームページです。

- [PineDuckへ](https://pineduck.jp/)

## 技術仕様

- **ホスティング**: [Cloudflare Workers](https://www.cloudflare.com/products/workers/)
- **フレームワーク**: [Astro](https://astro.build/)
- **言語**: TypeScript, Astro, Markdown
- **パッケージマネージャー**: npm

## 構成

```text
pineduck/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feat.md
│   │   └── fix.md
│   └── pull_request_template.md
├── docs/
│   ├── images/
│   │   └── *.webp
│   └── sprites.md
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── *.woff2
│   │   └── sprites/
│   │       ├── dynamic/
│   │       │   └── *.webp
│   │       └── static/
│   │           └── *.webp
│   ├── components/
│   │   ├── DynamicSprite.astro
│   │   ├── Footer.astro
│   │   ├── Head.astro
│   │   ├── Header.astro
│   │   ├── OptImg.astro
│   │   ├── ScrollDown.astro
│   │   ├── SelectList.astro
│   │   └── StaticSprite.astro
│   ├── content/
│   │   └── sprites/
│   │       ├── dynamic/
│   │       │   └── *.json
│   │       └── static/
│   │           └── *.json
│   ├── layouts/
│   │   └── SelectLayout.astro
│   ├── pages/
│   │   ├── art/
│   │   │   └── index.astro
│   │   ├── build/
│   │   │   └── index.astro
│   │   ├── cafe/
│   │   │   └── index.astro
│   │   ├── camp/
│   │   │   └── index.astro
│   │   ├── cooking/
│   │   │   └── index.astro
│   │   ├── diary/
│   │   │   └── index.astro
│   │   ├── duck-editor/
│   │   │   └── index.astro
│   │   ├── duck-portfolio/
│   │   │   └── index.astro
│   │   ├── duck-starter/
│   │   │   └── index.astro
│   │   ├── duck-tail/
│   │   │   └── index.astro
│   │   ├── farm/
│   │   │   └── index.astro
│   │   ├── sewing/
│   │   │   └── index.astro
│   │   ├── story/
│   │   │   └── index.astro
│   │   └── index.astro
│   ├── styles/
│   │   ├── dynamic-sprite.css
│   │   ├── footer.css
│   │   ├── global.css
│   │   ├── select.css
│   │   └── static-sprite.css
│   ├── types/
│   │   └── breadcrumb.ts
│   ├── consts.ts
│   └── content.config.ts
├── AGENTS.md
├── CLAUDE.md
├── CONTRIBUTING.md
├── README.md
├── astro.config.mjs
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── stylelint.config.mjs
└── tsconfig.json
```

### レイアウト

- `Select`: 選択画面のレイアウト
- `PR`: 販促画面のレイアウト
- `Article`: 記事画面のレイアウト
- `Contact`: お問い合わせ画面のレイアウト
- `TesterEmail`: テストメールフォーム画面のレイアウト

## セットアップ

### 必須環境

- Node.js 22.12.0 以上
- npm 10 以上

### インストール

```bash
git clone https://github.com/pineduckjp/pineduck.git
cd pineduck
npm install
```

## 開発ワークフロー

### ローカル開発

```bash
npm run dev
```

`http://localhost:4321` でサーバーが起動します。

## 開発ワークフロー

### ローカル開発

```bash
npm run dev
```

`http://localhost:4321` でサーバーが起動します。

### ビルド・プレビュー

```bash
# 本番ビルド
npm run build

# デプロイ前確認
npm run preview
```

## コマンド

ルートディレクトリで、以下のコマンドを実行できます。

| Command                   | Action                                        |
| :------------------------ | :-------------------------------------------- |
| `npm install`             | 依存関係をインストール                        |
| `npm run dev`             | `localhost:4321`で開発サーバーを開始          |
| `npm run build`           | ビルド結果を`./dist/`に出力                   |
| `npm run preview`         | デプロイ前にビルド結果をプレビュー            |
| `npm run astro ...`       | `astro add`, `astro check` を実行する時に使用 |
| `npm run astro -- --help` | Astro CLI のヘルプを参照                      |

## 貢献

このプロジェクトへの貢献に興味がある場合は、[CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## ドキュメント

- [スプライトの使用](./docs/sprites.md)
