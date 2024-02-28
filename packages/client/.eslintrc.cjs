module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    "unused-imports",
    "simple-import-sort",
    "import",
    "sort-keys-fix",
    "sort-destructure-keys",
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "import/no-duplicates": "error",
    "simple-import-sort/exports": "error",
  },
}
