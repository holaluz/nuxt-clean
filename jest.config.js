module.exports = {
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/src/$1',
    '^~~/(.*)$': '<rootDir>/src/$1',
    '@modules/*': './src/modules/*',
    '@shared/*': './src/shared/*',
    '@ui/*': './src/ui/*',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
}
