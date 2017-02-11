const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'betterdiscord.client.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}

module.exports = webpackConfig;
