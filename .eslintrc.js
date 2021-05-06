module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['lib', './lib'],
          ['components', './components'],
          ['styles', './styles'],
          ['lib', './lib'],
          ['assets', './assets'],
          ['contexts', './contexts'],
        ],
        extensions: ['.js', '.jsx', '.css', '.scss', '.svg'],
      },
    },
  },
};
