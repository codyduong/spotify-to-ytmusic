module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    indent: ['off', 2, { SwitchCase: 1 }],
    'linebreak-style': ['off', 'unix'],
    quotes: ['off', 'double'],
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
};
