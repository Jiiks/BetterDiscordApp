module.exports = {
    
    jsx: {
        cwd: 'src/jsx/compiled',
        expand: true,
        src: ['*.jsx'],
        dest: 'dist/jsx/',
        options: {
            wrapper: function(filepath, options) {
                return ['define([], () => {\n', `return ${filepath.match(/([^\/]+)(?=\.\w+)/)[0]};\n});`];
            }
        }
    }
    
};