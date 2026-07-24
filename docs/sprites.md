# スプライトの使用

Aseprite で作成したスプライトシートをコンポーネントで CSS に変換して使用することができます。

アニメーション付きのスプライトは、`DynamicSprite` コンポーネントを使用してください。アニメーションなしのスプライトは、`StaticSprite` コンポーネントを使用してください。

## 手順

### 1. Aseprite でスプライトシートを作成する

以下の項目を確認してください。

- 全てのフレームにタグが付いていること
- アニメーションはないこと

![Aseprite の例 - 1](./images/aseprite-example1.webp)

- **エクスポート > スプライトシートのエクスポート**を選択

![Aseprite の例 - 2](./images/aseprite-example2.webp)

- スプライト設定
  - 生成元: Sprite
  - タグ分割: ✔︎

![Aseprite の例 - 3](./images/aseprite-example3.webp)

- 出力設定 (`StaticSprite` の場合)
  - 出力ファイル: `/src/assets/sprites/static/*.webp`
  - JSONデータ:
    - フォーマット: ハッシュマップ
    - タグ: ✔︎
    - 出力ファイル: `/src/content/sprites/static/*.json`
    - アイテムファイル名: `{title}-{tag}`
    - タグ名: `{tag}`

![Aseprite の例 - 4](./images/aseprite-example4.webp)

- 出力設定 (`DynamicSprite` の場合)
  - 出力ファイル: `/src/assets/sprites/dynamic/*.webp`
  - JSONデータ:
    - フォーマット: ハッシュマップ
    - タグ: ✔︎
    - 出力ファイル: `/src/content/sprites/dynamic/*.json`
    - アイテムファイル名: `{title}-{tag}-{frame}`
    - タグ名: `{tag}`

![Aseprite の例 - 5](./images/aseprite-example5.webp)

### 2. コンポーネントでスプライトを使用する

#### 2.1. `StaticSprite` コンポーネントを使用する場合

Astro ファイルで以下のように記述します。

```astro
---
import StaticSprite from "@/components/StaticSprite.astro";
---

<StaticSprite
  name="logo-icon-download"
  width={100}
  height={100}
  alt="Logo Icon Download"
/>
```

属性は以下の通りです。

```typescript
interface Props {
  name: string; // 例: logo-icon-art (タグ名)
  width?: number;
  height?: number;
  alt?: string;
}
```

### 2.2. `DynamicSprite` コンポーネントを使用する場合

Astro ファイルで以下のように記述します。

```astro
---
import DynamicSprite from "@/components/DynamicSprite.astro";
---

<DynamicSprite name="canvas-home" alt="Canvas Home" />
```

属性は以下の通りです。

```typescript
interface Props {
  name: string; // 例: canvas-home (タグ名)
  alt?: string;
}
```
