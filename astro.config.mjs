// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import favicons from "astro-favicons";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://pineduck.jp/",

  vite: {
    optimizeDeps: {
      // Vite の SSR 依存最適化で Astro Cloudflare のサーバーエントリポイントを事前バンドルしない。環境によっては古い deps_ssr 参照が残り、404 レンダリングがクラッシュすることがある。
      exclude: ["@astrojs/cloudflare/entrypoints/server"],
    },
  },

  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      PUBLIC_CONTACT_API_URL: {
        type: "string",
        context: "client",
        access: "public",
      },
      PUBLIC_ANDROID_MVP_REQUEST_API_URL: {
        type: "string",
        context: "client",
        access: "public",
      },
      PUBLIC_TURNSTILE_SITE_KEY: {
        type: "string",
        context: "client",
        access: "public",
      },
      TURNSTILE_SECRET_KEY: {
        type: "string",
        context: "server",
        access: "secret",
      },
      CORS_ORIGIN: {
        type: "string",
        context: "server",
        access: "secret",
      },
    },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Dot",
      cssVariable: "--font-dot",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/JF-Dot-Shinonome-16-Subset.woff2"],
            display: "block",
          },
        ],
      },
    },
  ],

  integrations: [
    favicons({
      name: "PineDuck",
      short_name: "PineDuck",
      background: "rgb(229 228 227)",
      themes: ["rgb(229 228 227)"],
      manifest: {
        description: "自給自足プラットフォーム「PineDuck」のホームページです。",
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "browser"],
      },
    }),
  ],

  adapter: cloudflare(),
});
