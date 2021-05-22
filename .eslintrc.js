module.exports = {
  root: true,
  env: {
    es2020: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'json-format'],
  settings: {
    'json/sort-package-json': 'standard',
  },
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        // ts: 'never',
        // tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        // extensions: ['.js', '.jsx', '.tsx'],
        extensions: ['.js', '.jsx'],
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/ <reference'],
      },
    ],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': [0],
    'no-underscore-dangle': 0,
    'no-console': 'error',
  },
};
