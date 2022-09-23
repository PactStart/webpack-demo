const { resolve } = require('path');

module.exports = {
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        allowImportExportEverywhere: true
    },
    rules: {
        "global-require": 0
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: resolve(__dirname, './webpack.base.config.js')
            }
        }
    }
}