module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> | <%= pkg.version %> | <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            dist: ['src/*.js']
        },
        copy: {
            src: {
                expand: true,
                src: 'src/<%= pkg.name %>.js',
                dest: '.tmp',
            },
            serve: {
                expand: true,
                cwd: 'app',
                src: '**',
                dest: '.tmp',
            }
        },
        watch: {
            src: {
                options: {
                    livereload: true
                },
                files: ['src/*.js'],
                tasks: ['copy:src']
            },
            serve: {
                options: {
                    livereload: true
                },
                files: ['app/**/*.*'],
                tasks: ['copy:serve']
            }
        },
        connect: {
            options: {
                port: 3000,
                hostname: 'localhost',
                base: '.tmp',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('deploy', ['jshint', 'uglify']);
    grunt.registerTask('default', ['copy', 'connect', 'watch']);

};
