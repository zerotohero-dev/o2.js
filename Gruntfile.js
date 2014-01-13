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
                src: ['src/o2/*/*.js'],
                options: {
                    errorsOnly: false,

                    /**
                     * Different resources recommend different values for
                     * cyclomatic complexity.
                     *
                     * For instance http://www.amazon.com/dp/1842651765/
                     * recommends a value of 10 and says even 15 may be
                     * acceptable.
                     * On the other hand, http://bit.ly/cyclomatic regards a
                     * number below 10 as "reliable".
                     * Also McCabe (1996) discusses about limiting cyclomatic
                     * complexity to 10.
                     *
                     * Keeping this at "5", a reasonably strict value: This
                     * overly-conservative choice will also force splitting
                     * longer methods into smaller sub-methods.
                     */
                    cyclomatic: 5,

                    /**
                     * There does not appear a common consensus for this metric
                     * either.
                     *
                     * o2.js code uses "15" to err on the conservative side.
                     * This value might adjust itself as the library evolves.
                     *
                     * Here are some interesting findings:
                     *
                     * http://www.amazon.com/dp/0471887137 suggests 50 to 100
                     * lines of code, less than 10 cyclomatic complexity, and
                     * less than 10 Halstead difficulty per method.
                     *
                     * Some other resources recommend a Halstead "volume" of
                     * at least 20, and not more than 1000 per method.
                     *
                     * http://www.mccabe.com/pdf/McCabe%20IQ%20Metrics.pdf
                     * suggests a threshold of 30 for Halstead difficulty index.
                     *
                     * There even are sources that take numbers as high as 50
                     * as a difficulty thresholds for methods
                     * (e.g., http://bit.ly/halstead50).
                     *
                     * And some sources even argue that using Halstead
                     * difficulty does not prove much value, since they are
                     * simpler methods (such as counting lines of code) that
                     * provide adequate information.
                     * See, for example, http://bit.ly/simplerIsBetter which
                     * shows high correlation between SLOC and Halstead
                     * difficulty;
                     * meaning: simply counting lines of code gives mostly the
                     * same information as doing a more complex Halstead
                     * analysis.
                     */
                    halstead: 15,

                    /**
                     * 65 is considered to be a real warning sign.
                     * 85 and more is recommended.
                     * ref: http://bit.ly/complexityMetrics
                     *
                     * Keeping it at 100 to be conservative.
                     */
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
