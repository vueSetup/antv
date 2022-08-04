// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../configs/f2/jest.config');

module.exports = {
  ...config,
  testPathIgnorePatterns: [],
  setupFilesAfterEnv: ['../../configs/f2/jest-setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
        ],
        plugins: ['@vue/babel-plugin-jsx'],
      },
    ],
  },
};
