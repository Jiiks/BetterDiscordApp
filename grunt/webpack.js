module.exports = {
    
    dist: {
        entry: './src/js/main.js',
        output: {
            path: 'dist/',
            filename: 'main.js'
        },
        module: {
            loaders: [{
                js: /\.js$/, loader: 'jsx-loader'
            }]
        }
    }
    
};