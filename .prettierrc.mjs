const config = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.jsonc",
      options: {
        parser: "jsonc",
        trailingComma: "none",
      },
    },
  ],
};

export default config;
