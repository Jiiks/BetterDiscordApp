module.exports = {
    
    jsx: {
        cwd: 'src/compiled/jsx',
        expand: true,
        src: ['*.jsx'],
        dest: 'dist/jsx/',
        options: {
            wrapper: function(filepath, options) {
                return ['define([], () => {\n', `return ${filepath.match(/([^\/]+)(?=\.\w+)/)[0]};\n});`];
            }
        }
    },
    dist: {
        cwd: 'src/compiled/js',
        expand: true,
        src: ['main.js'],
        dest: 'dist/js/',
        options: {
            wrapper: function(filepath, options) {
                return ['!(function() {\nvar UI;\n', '\n})();'];
            }
        }
    }
    
};