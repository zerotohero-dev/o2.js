module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/o2/**/*.js']
        }
    });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
};
