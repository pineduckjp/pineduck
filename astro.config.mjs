// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://pineduck.jp/",
  devToolbar: {
    enabled: false,
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
});
