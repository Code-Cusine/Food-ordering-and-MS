module.exports = {
  extends: ['react-app', 'react-app/jest'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // You can add custom rules here if needed
  },
};
