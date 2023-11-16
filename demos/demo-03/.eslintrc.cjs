module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // ignore unused args starting with _
        varsIgnorePattern: '^_', // ignore unused vars starting with _
        caughtErrorsIgnorePattern: '^_', // ignore unused caught errors starting with _
      },
    ],
  },
};
