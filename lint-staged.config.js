/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('lodash.merge')
const lintStagedConfig = require('@holaluz/npm-scripts').lintStaged

const a = merge(lintStagedConfig, {
  '*.{js,ts,vue}': [
    'prettier --write',
    'eslint',
    'npm run test -- --findRelatedTests',
  ],
})

console.log(a)

module.exports = a
