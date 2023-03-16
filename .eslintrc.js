module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "no-case-declarations": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-constant-condition": "off",
  },
};
