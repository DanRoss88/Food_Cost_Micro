module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    complexity: ["error", { max: 6 }],
    "max-depth": ["error", { max: 2 }],
    "max-nested-callbacks": ["error", { max: 2 }],
    "max-params": ["error", { max: 3 }],
    "max-statements": [
      "error",
      { max: 12 },
      { ignoreTopLevelFunctions: false },
    ],
    "max-len": ["error", { code: 120, ignoreUrls: true }],
    "max-lines": [
      "error",
      { max: 200, skipComments: true, skipBlankLines: true },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
