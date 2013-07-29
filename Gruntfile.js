module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['Gruntfile.js', 'src/o2/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
