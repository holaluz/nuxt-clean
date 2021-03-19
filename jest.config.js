const { pathsToModuleNameMapper } = require('ts-jest/utils')
const merge = require('lodash.merge')
const jestConfig = require('@holaluz/npm-scripts').jest
const { compilerOptions } = require('./tsconfig.json')

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>',
})

module.exports = merge(jestConfig, {
  moduleNameMapper: {
    '^@@/(?!node_modules)(.*)$': '<rootDir>/$1',
    '^~~/(?!node_modules)(.*)$': '<rootDir>/src/$1',
    ...moduleNameMapper,
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  setupFilesAfterEnv: [...jestConfig.setupFilesAfterEnv, './jest.setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    'vee-validate/dist/rules': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(vee-validate/dist/rules))'],
})
