module.exports = {
    
    dist: {
        entry: './src/main.js',
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