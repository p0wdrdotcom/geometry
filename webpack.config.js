const path = require('path');

module.exports = [{
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|common\/libs)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'es2015'
                }
            }
        }]
    }
}, {
    mode: 'development',
    entry: './test/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|common\/libs)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'es2015'
                }
            }
        }]
    }
}];