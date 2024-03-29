module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  ]
, rules: {
    'no-inner-declarations': 'off'
  , '@typescript-eslint/ban-types': 'off'
  , '@typescript-eslint/no-inferrable-types': 'off'
  }
}
