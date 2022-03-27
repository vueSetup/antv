const config = require('../../jest.config')

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
    ...config,
    setupFilesAfterEnv: ['../../jest-setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]
                ],
                plugins: ['@vue/babel-plugin-jsx']
            }
        ]
    }
}
