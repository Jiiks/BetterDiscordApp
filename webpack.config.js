const 
    path = require('path'),
    webpack = require('webpack');

const sassLoader = {
    test: /\.scss$/,
    loader: ['css-loader', 'sass-loader']
};

const awesomeTsLoader = {
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader"
}

const sourceMapLoader = {
    test: /\.js$/,
    enforce: "pre",
    loader: "source-map-loader"
}

module.exports = {
    entry: "./client/src/index.ts",
    output: {
        filename: "bdclient.js",
        path: __dirname + "/client/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        loaders: [ sassLoader, awesomeTsLoader, sourceMapLoader ]
    },
    externals: {
        "react": "window.require('react')",
        "React": "window.require('react')",
        "ReactDOM": "window.require('react-dom')",
        "react-dom": "window.require('react-dom')",
        "fs": "window.require('fs')",
        "wr": "window.require"
    }
}

/*
module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ],
        loaders: [sassLoader]
    },
    */