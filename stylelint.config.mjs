export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  overrides: [
    {
      files: ["**/*.astro", "**/*.html"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: ["dist/**", ".astro/**", "node_modules/**"],
};
