/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('lodash.merge')
const lintStagedConfig = require('@holaluz/npm-scripts').lintStaged

module.exports = merge(lintStagedConfig, {
  '*.{js,ts,vue}': [
    'prettier --write',
    'eslint',
    'npm run test -- --findRelatedTests',
  ],
})
