module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['Gruntfile.js', 'src/**/*.js']
        },
        connect: {
            test: {
                options: {
                    port: 8080
                }
            }
        },
        jasmine: {
            taskName: {
                src: 'amd/**/*.js',
                options: {
                    specs: 'test/web/*_test.js',
                    host: 'http://127.0.0.1:8080/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                        }
                    }
                }
            }
        },
        complexity: {
            generic: {
                src: ['src/**/*.js'],
                options: {
                    jsLintXML: 'report.xml', // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false, // show only maintainability errors
                    cyclomatic: 3,
                    halstead: 8,
                    maintainability: 100
                }
            }
        },
        exec: {
            clean: {
                command: 'sh bin/clean.sh',
                stdout: true,
                stderr: true
            },
            install: {
                command:'sh bin/install.sh',
                stdout: true,
                stderr: true
            },
            amdify: {
                command: 'r.js -convert src/o2 amd/o2;',
                stdout: true,
                stderr: true
            },
            'test': {
                command: 'npm test',
                stdout: true,
                stderr: true
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                logo: '../assets/logo.png',

                options: {
                    paths: 'src/o2',
                    outdir: 'documentation'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['connect:test', 'jasmine']);
    grunt.registerTask('publish', [
        'exec:clean',
        'exec:install',
        'exec:amdify',
        'lint',
        'complexity'
    ]);
    grunt.registerTask('testAll', ['exec:test', 'test']);
    grunt.registerTask('doc', ['yuidoc']);
};
