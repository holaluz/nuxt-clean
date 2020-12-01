const merge = require('lodash.merge')
const eslintConfig = require('@holaluz/npm-scripts').eslint

delete eslintConfig.parserOptions

module.exports = merge(eslintConfig, {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'array-callback-return': 'off',
  },
})
