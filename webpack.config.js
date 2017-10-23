const path = require('path');

module.exports = [{
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|common\/libs)/,
            loader: 'babel-loader',
            query: {
                presets: 'es2015'
            }
        }]
    }
}, {
    entry: './test/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|common\/libs)/,
            loader: 'babel-loader',
            query: {
                presets: 'es2015'
            }
        }]
    }
}];