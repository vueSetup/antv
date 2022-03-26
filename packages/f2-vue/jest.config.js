const config = require('../../jest.config')

module.exports = {
    ...config,
    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(ts|tsx)$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-typescript']
                ],
                plugins: ['@vue/babel-plugin-jsx']
            }
        ]
    }
}
