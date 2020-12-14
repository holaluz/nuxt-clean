const merge = require('lodash.merge')
const jestConfig = require('@holaluz/npm-scripts').jest

module.exports = merge(jestConfig, {
  moduleNameMapper: {
    '^@@/(?!node_modules)(.*)$': '<rootDir>/$1',
    '^~~/(?!node_modules)(.*)$': '<rootDir>/src/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@ui/(.*)': '<rootDir>/src/ui/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  setupFilesAfterEnv: [...jestConfig.setupFilesAfterEnv, './jest.setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    'vee-validate/dist/rules': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(vee-validate/dist/rules))'],
})
