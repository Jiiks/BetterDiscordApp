const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'betterdiscord.client.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.scss$/,
                loader: ['css-loader', 'sass-loader']
            }
        ]
    },
    externals: {
        "react": "window.require('react')",
        "React": "window.require('react')",
        "ReactDOM": "window.require('react-dom')",
        "events": "window.require('events')",
        "fs": "window.require('fs')",
        "electron": "window.require('electron')"
    }
    /*plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]*/
};