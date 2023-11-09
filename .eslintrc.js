module.exports = {
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
