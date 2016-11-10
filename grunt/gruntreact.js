module.exports = {
    react: {
        files: [{
            expand: true,
            cwd: 'src/jsx',
            src: ['**/*.jsx'],
            dest: 'src/compiled/jsx',
            ext: '.jsx'
            
        }],
        options: {
            es6module: true
        }
    }
};