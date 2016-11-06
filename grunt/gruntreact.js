module.exports = {
    react: {
        files: [{
            expand: true,
            cwd: 'src/jsx',
            src: ['**/*.jsx'],
            dest: 'src/jsx/compiled',
            ext: '.jsx'
            
        }],
        options: {
            es6module: true
        }
    }
};