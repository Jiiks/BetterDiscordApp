module.exports = grunt => {
    'use strict';
    
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    
    grunt.config('webpack', require('./grunt/webpack.js'));
    grunt.config('wrap', require('./grunt/gruntwrap.js'));
    grunt.config('react', require('./grunt/gruntreact.js'));
    grunt.config('clean', require('./grunt/clean.js'));

    grunt.registerTask('wp', ['webpack']);
    grunt.registerTask('wrapjsx', ['wrap:jsx']);
    grunt.registerTask('gr', ['react']);
    grunt.registerTask('cleaner', ['clean']);
    
    grunt.registerTask('pack', ['react', 'wrap:jsx', 'webpack', 'cleaner']);
};