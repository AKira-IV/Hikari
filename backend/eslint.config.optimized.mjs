const { ESLint } = require("eslint");

module.exports = [
  {
    files: ["**/*.ts"],
    ignores: ["dist/**/*", "node_modules/**/*"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // TypeScript strict rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",

      // Security-specific: More permissive for HTTP handling
      "@typescript-eslint/no-unsafe-assignment": "off", // Common in HTTP middleware
      "@typescript-eslint/no-unsafe-member-access": "off", // Common in request objects
      "@typescript-eslint/no-unsafe-argument": "warn", // Keep as warning
      "@typescript-eslint/no-unsafe-return": "warn", // Keep as warning
      "@typescript-eslint/no-unsafe-call": "error", // Keep strict

      // Reduce redundant rules
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/require-await": "off", // Allow async without await
    },
  },
  {
    // Special rules for security modules
    files: ["src/common/**/*.ts", "src/security/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
];
