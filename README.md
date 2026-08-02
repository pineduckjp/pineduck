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
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── settings.json
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feat.md
│   │   └── fix.md
│   └── pull_request_template.md
├── docs/
│   ├── images/
│   │   └── *.webp
│   └── sprites.md
├── drizzle/
│   ├── migrations/
│   │   └── migration.sql
│   └── sql/
│       └── local/
│           ├── get-android-mvp-requests.sql
│           ├── get-contacts.sql
│           ├── reset-android-mvp-requests.sql
│           └── reset-contacts.sql
├── public/
│   ├── appstore-badge-jp.svg
│   ├── favicon.svg
│   └── playstore-badge-jp.svg
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── *.woff2
│   │   ├── images/
│   │   │   ├── art/
│   │   │   │   └── *.webp
│   │   │   └── diary/
│   │   │       └── *.webp
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
│   ├── db/
│   │   └── schema.ts
│   ├── layouts/
│   │   ├── ArticleLayout.astro
│   │   ├── FormLayout.astro
│   │   ├── NotFoundLayout.astro
│   │   ├── PrLayout.astro
│   │   └── SelectLayout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── api/
│   │   │   ├── add-android-mvp-request.ts
│   │   │   └── add-contact.ts
│   │   ├── art/
│   │   │   ├── android-mvp-request.astro
│   │   │   ├── index.astro
│   │   │   ├── pr.astro
│   │   │   ├── privacy.astro
│   │   │   └── terms.astro
│   │   ├── build/
│   │   │   └── index.astro
│   │   ├── cafe/
│   │   │   └── index.astro
│   │   ├── camp/
│   │   │   └── index.astro
│   │   ├── commerce.astro
│   │   ├── contact.astro
│   │   ├── cooking/
│   │   │   └── index.astro
│   │   ├── diary/
│   │   │   ├── index.astro
│   │   │   ├── pr.astro
│   │   │   ├── privacy.astro
│   │   │   └── terms.astro
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
│   │   ├── index.astro
│   │   ├── privacy.astro
│   │   ├── sewing/
│   │   │   └── index.astro
│   │   ├── story/
│   │   │   └── index.astro
│   │   └── terms.astro
│   ├── server/
│   │   └── helper.ts
│   ├── styles/
│   │   ├── article.css
│   │   ├── dynamic-sprite.css
│   │   ├── footer.css
│   │   ├── form.css
│   │   ├── global.css
│   │   ├── not-found.css
│   │   ├── pr.css
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
├── .gitignore
├── .prettierrc.mjs
├── astro.config.mjs
├── drizzle.config.ts
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── stylelint.config.mjs
├── tsconfig.json
├── worker-configuration.d.ts
└── wrangler.jsonc
```

### レイアウト

- `Select`: 選択画面のレイアウト
- `PR`: 販促画面のレイアウト
- `Article`: 記事画面のレイアウト
- `Contact`: お問い合わせ画面のレイアウト
- `TesterEmail`: テストメールフォーム画面のレイアウト

## 環境変数

### Cloudflare Workers 側で設定する環境変数

ローカルでは `.dev.vars` を使用し、本番環境では　Cloudflare のダッシュボードか CLI で設定します。

```text
TURNSTILE_SECRET_KEY=<Cloudflare Turnstile のシークレットキー>
CORS_ORIGIN=<CORSを許可するオリジン>
```

D1 などのバインディングは、`wrangler types` で生成される `worker-configuration.d.ts` に定義されています。詳しくは、[ドキュメント](https://developers.cloudflare.com/workers/languages/typescript/#migrating) を参照してください。

### GitHub Actions 側で設定する環境変数

ローカルでは `.env` を使用し、本番環境では GitHub Actions の Secrets もしくは Vars で設定します。

```text
PUBLIC_CONTACT_API_URL=<お問い合わせAPIのURL>
PUBLIC_ANDROID_MVP_REQUEST_API_URL=<Android MVPリクエストAPIのURL>

PUBLIC_TURNSTILE_SITE_KEY=<Cloudflare Turnstile のサイトキー>

CLOUDFLARE_ACCOUNT_ID=<Cloudflare アカウントID> # シークレット
CLOUDFLARE_API_TOKEN=<Cloudflare APIトークン> # シークレット
```

### ローカルでのみ使用する環境変数

drizzle-kit 関係のコマンドである `drizzle-kit generate` や `drizzle-kit push` などを使用するために、ローカルでのみ使用する環境変数を `.env` に設定します。

```text
# CLOUDFLARE_ACCOUNT_ID=<Cloudflare アカウントID>
CLOUDFLARE_DATABASE_ID=<Cloudflare D1 データベースID>
CLOUDFLARE_D1_TOKEN=<Cloudflare D1 データベーストークン>
```

Drizzle + D1 の設定については、[drizzle-kit のドキュメント](https://orm.drizzle.team/docs/get-started/d1-new) を参照してください。

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
