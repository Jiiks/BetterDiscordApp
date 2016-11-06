module.exports = grunt => {
    'use strict';
    
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    
    grunt.config('webpack', require('./grunt/webpack.js'));
    
    grunt.registerTask('default', ['webpack']);
};