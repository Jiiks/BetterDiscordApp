module.exports = {
    
    jsx: {
        cwd: 'src/jsx/compiled',
        expand: true,
        src: ['*.jsx'],
        dest: 'dist/jsx/',
        options: {
            wrapper: ['define([], () => {\n', '\n return element;\n});']
        }
    }
    
};