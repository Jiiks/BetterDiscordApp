module.exports = {
    
    dist: {
        entry: [
            './src/js/main.js'
        ],
        output: {
            path: 'src/compiled/js/',
            filename: "main.js",
            library: 'BD'
        },
        module: {
            loaders: [{
                js: /\.js$/, loader: 'jsx-loader'
            }]
        }
    }
    
};