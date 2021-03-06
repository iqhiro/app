module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/src/frame/intro.js',
                    'js/src/*.js',
                    'js/src/frame/outro.js'
                ],
                dest: 'js/app.js'
            }
        },

        jshint: {
            beforeconcat: [
                'js/src/*.js'
            ],
            afterconcat: [
                'js/app.js'
            ],
            options: {
                'sub':true
            }
        },

        'closure-compiler': {
            fontend: {
                //closurePath: '~/compiler/compiler.jar',
                js: 'js/app.js',
                jsOutputFile: 'js/app.min.js',
                maxBuffer: 500,
                options: {
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['jshint:beforeconcat', 'concat', 'jshint:afterconcat'],
                options: {}
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //ToDo add grunt-closure-compiler

    grunt.registerTask('default',['jshint:beforeconcat','concat','jshint:afterconcat','closure-compiler']);
};
