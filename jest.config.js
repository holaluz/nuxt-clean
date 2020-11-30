module.exports = {
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/src/$1',
    '^~~/(.*)$': '<rootDir>/src/$1',
    '@modules/*': '<rootDir>/src/modules/*',
    '@shared/*': '<rootDir>/src/shared/*',
    '@ui/*': '<rootDir>/src/ui/*',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
}
