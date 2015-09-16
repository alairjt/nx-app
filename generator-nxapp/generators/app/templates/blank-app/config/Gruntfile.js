module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        userConfig: grunt.file.readJSON((process.env.USERPROFILE || process.env.HOME) + '/.grunt/user-config.json'),
        bower: {
            install: {
            }
        },

        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.all.options.port%>',
            }
        },

        livereload:{
            port: 35728,
        },

           
        connect: {

            all: {
                options:{
                    port: 9000,
                    hostname: "localhost",
                    directory: ["<% pkg.sourcesDir %>"],
                    
                    middleware: function(connect, options) {

                        return [
                            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                            connect.static('../src')
                        ];
                    }
                },
            }

        },

        regarde: {
            all: {
            // This'll just watch the index.html file, you could add **/*.js or **/*.css
            // to watch Javascript and CSS files too.
            files:['../src/**'],
            // This configures the task that will run when the file change
            tasks: ['karma:devlocal']
          }
        },


        clean: {
            options: {force: true},
            start: {
                src: ['<%= pkg.garbageDir %>', '<%= pkg.distDir %>', '<%= pkg.distDirZip %>']
            },
            startTest: {
                src: ['qa/coverage']
            },
            distZipFolder: {
                src: ['<%= pkg.distDirZip %>' + '/' + "<%= pkg.webContext %>"]
            },
            finish: {
                src: ['<%= pkg.garbageDir %>', '<%= pkg.distDir %><%= pkg.concatJsFile %>', '<%= pkg.distDir %><%= pkg.concatCssFile %>']
            },
            finishDeploy: {
                src: ['<%= pkg.distDirZip %>']
            },
            finishTeste: {
                src: ['qa/coverage/src']
            },
            index_prod: {
                src: ['<%= pkg.distDir %>/' + 'index.html']
            },
            index_dist: {
                src: ['<%= pkg.distDir %>/' + 'index_dist_local.html']
            },
            bower: {
                src: ['../src/lib']
            },
            libs: {
                src: ['dist', 'lib', 'library', 'src', '../lib']
            },
            libDir: {
                src: ['<%= pkg.libDir %>']
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-jenkins-checkstyle-reporter'),
                reporterOutput: 'qa/report-jshint-checkstyle.xml',
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                force: true
            },
            dist: ['<%= pkg.sourcesDir %>*/*.js',
                '<%= pkg.sourcesDir %>*/*/*.js',
                '<%= pkg.sourcesDir %>*/*/*/*.js',
                '<%= pkg.sourcesDir %>*/*/*/*/*.js',
                '<%= pkg.sourcesDir %>*/*/*/*/*/*.js',
                '<%= pkg.sourcesDir %>*/*/*/*/*/*/*.js']
        },
        concat: {
            js: {
                files: [
                    {
                        src: ['<%= pkg.sourcesDir %>app/*.js'],
                        dest: '<%= pkg.garbageDir %><%= pkg.concatJsFile %>'
                    },
                    {
                        src: ['<%= pkg.sourcesDir %>*/*.js', '<%= pkg.sourcesDir %>*/*/*.js', '<%= pkg.sourcesDir %>*/*/*/*.js', '!<%= pkg.libDir %>'],
                        dest: '<%= pkg.garbageDir %><%= pkg.concatJsFile %>'
                    }
                ]
            },
            css: {
                src: ['<%= pkg.sourcesDir %>*/*.css', '<%= pkg.sourcesDir %>*/*/*.css', '<%= pkg.sourcesDir %><%= pkg.sharedDir %>*/*/*/*.css', '!<%= pkg.libDir %>/*'],
                dest: '<%= pkg.garbageDir %><%= pkg.concatCssFile %>'
            }
        },
        uglify: {
            dist: {
                src: ['<%= pkg.garbageDir %><%= pkg.concatJsFile %>'],
                dest: '<%= pkg.garbageDir %><%= pkg.minJsFile %>'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        src: ['<%= pkg.sourcesDir %>*/*.json', '<%= pkg.sourcesDir %>*/*/*.json', '<%= pkg.sourcesDir %>*/*/*/*.json'],
                        dest: '<%= pkg.garbageDir %>'
                    },
                    {
                        expand: true,
                        src: ['<%= pkg.sourcesDir %>*/*.html', '<%= pkg.sourcesDir %>*/*/*.html', '<%= pkg.sourcesDir %>shared/*/*/*.html'],
                        dest: '<%= pkg.garbageDir %>'
                    },
                    {
                        expand: true,
                        src: ['<%= pkg.sourcesDir %>*.html', '!<%= pkg.sourcesDir %>index.html', '!<%= pkg.sourcesDir %>index_prod.html'],
                        dest: '<%= pkg.garbageDir %>'
                    },
                    {
                        expand: true,
                        src: ['<%= pkg.sourcesDir %><%= pkg.sharedDir %>*/*.html'],
                        dest: '<%= pkg.garbageDir %>'
                    },
                    {
                        '<%= pkg.garbageDir %>index.html': '<%= pkg.sourcesDir %><%= pkg.indexFile %>'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= pkg.garbageDir %><%= pkg.minCssFile %>': ['<%= pkg.garbageDir %><%= pkg.concatCssFile %>']
                }
            }
        },
        karma: {
            dist: {
                configFile: 'karma.conf.js'
            },
            dev: {
                configFile: 'karma.conf.dev.js'
            },
            devlocal: {
                configFile: 'karma.conf.dev-local.js'
            }
        },
        copy: {
            create: {
                files: [
                    // outros ressources
                    {
                        src: ['<%= pkg.sourcesDir %>*/*', '<%= pkg.sourcesDir %>*/*/*', '<%= pkg.sourcesDir %>shared/*/*/*', '!<%= pkg.libDir %>',
                            '!<%= pkg.sourcesDir %>*/*.css', '!<%= pkg.sourcesDir %>*/*/*.css', '!<%= pkg.sourcesDir %>shared/*/*/*.css',
                            '!<%= pkg.sourcesDir %>*/*.js', '!<%= pkg.sourcesDir %>*/*/*.js', '!<%= pkg.sourcesDir %>shared/*/*/*.js'],
                        dest: '<%= pkg.garbageDir %>'
                    },
                    // Copia todo o build para o diretorio /dist
                    {
                        expand: true, cwd: '<%= pkg.garbageDir %>', src: ['**'], dest: '<%= pkg.distDir %>'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true, cwd: '<%= pkg.sourcesDir %>', src: ['**'], dest: 'qa/coverage/src'
                    }
                ]
            },
            dist: {
                files: [
                    // Copia todo o build para o diretorio /dist
                    {
                        expand: true, cwd: '<%= pkg.garbageDir %>', src: ['**', '!*.js'], dest: '<%= pkg.distDir %>'
                    }
                ]
            },
            distZip: {
                files: [
                    // Copia todo o build para o diretorio 
                    {
                        expand: true, cwd: '<%= pkg.distDir %>', src: ['**'], dest: '<%= pkg.distDirToZip %>'
                    }
                ]
            },
            artifactoryLibs: {
                files: [
                    {
                        expand: true, cwd: 'dist', src: ['**'], dest: '<%= pkg.libDir %>'
                    }
                ]
            },
            libs: {
                files: [
                    {
                        expand: true, cwd: 'library', src: ['**'], dest: '<%= pkg.libDir %>'
                    }
                ]
            },
            moveLib: {
                files: [
                    {
                        expand: true, cwd: '<%= pkg.libDir %>', src: ['**'], dest: '../lib'
                    }
                ]
            },
            replaceLib: {
                files: [
                    {
                        expand: true, cwd: '../lib', src: ['**'], dest: '<%= pkg.libDir %>'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: "<%= pkg.distDirZip %><%= pkg.nomeZip %>"
                },
                files: [
                    {expand: true, src: "**/*", cwd: "<%= pkg.distDirZip %>"}
                ]
            }
        },
        hashres: {
            // Global options
            options: {
                // Optional. Encoding used to read/write files. Default value 'utf8'
                encoding: 'utf8',
                // Optional. Format used to name the files specified in 'files' property.
                // Default value: '${hash}.${name}.cache.${ext}'
                fileNameFormat: '${hash}.${name}.cache.${ext}',
                // Optional. Should files be renamed or only alter the references to the files
                // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
                // Default value: true
                renameFiles: true
            },
            // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
            prod: {
                // Specific options, override the global ones
                options: {
                    // You can override encoding, fileNameFormat or renameFiles
                },
                // Files to hash
                src: [
                    // WARNING: These files will be renamed!
                    '<%= pkg.distDir %>scripts.min.js',
                    '<%= pkg.distDir %>stylesheet.min.css'],
                // File that refers to above files and needs to be updated with the hashed name
                dest: '<%= pkg.distDir %>index.html'
            }
        },
        plato: {
            default: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'qa/plato': ['<%= pkg.sourcesDir %>/*.js',
                        '<%= pkg.sourcesDir %>/*/*.js',
                        '<%= pkg.sourcesDir %>/*/*/*.js',
                        '<%= pkg.sourcesDir %>/*/*/*/*.js',
                        '<%= pkg.sourcesDir %>/*/*/*/*/*.js']
                }
            }
        },
        artifactory: {
            options: {
                url: '<%= userConfig.artifactory.url %>',
                repository: '<%= userConfig.artifactory.repository.publish %>',
                username: '<%= userConfig.artifactory.username %>',
                password: '<%= userConfig.artifactory.password %>'
            },
            snapshot: {
                options: {
                    repository: '<%= userConfig.artifactory.repository.snapshot %>',
                    fetch: [
                    ]
                }
            },
            release: {
                options: {
                    repository: '<%= userConfig.artifactory.repository.release %>',
                    fetch: [
                        {id: 'com.nexxera.js:nexxeraComponents:zip:1.1.0', path: '<%= pkg.garbageDir %>'},
                        {id: 'com.nexxera.js:hivecommon:zip:1.0.1', path: '<%= pkg.garbageDir %>'},
                        {id: 'com.nexxera.js:designComponents:zip:1.0.1', path: '<%= pkg.garbageDir %>'}
                    ]
                }
            }
        },
        'string-replace': {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '../src/lib/hivecommon-<%= pkg.hiveCommomVersion %>/',
                        src: '**/*',
                        dest: '../src/lib/hivecommon-<%= pkg.hiveCommomVersion %>/'
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: '!API_END_POINT',
                            replacement: 'https://{subdomain}-dev.nexxera.com/'
                        },
                        {
                            pattern: '!LOGIN_URL',
                            replacement: 'https://aenhive-dev.nexxera.com/HiveLogin/#/'
                        },
                        {
                            pattern: '!AUTH_URL',
                            replacement: 'https://devweb2.nexxera.com/nexxauth/'
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-artifactory-artifact');
    grunt.loadNpmTasks('grunt-bower-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-force');


    grunt.registerTask('move-lib', ['clean:libs', 'copy:moveLib', 'clean:libDir']);
    grunt.registerTask('replace-lib', ['clean:libDir', 'copy:replaceLib', 'clean:libs']);
    grunt.registerTask('qa', ['clean:start', 'clean:startTest', 'copy:test', 'karma:dev', 'jshint', 'plato', 'clean:finishTeste']);
    grunt.registerTask('dist', ['clean:start', 'concat', 'uglify', 'copy:create', 'htmlmin', 'cssmin', 'copy:dist', 'clean:finish']);
    grunt.registerTask('dist-local', ['move-lib', 'qa', 'dist', 'clean:index_prod', 'replace-lib']);
    grunt.registerTask('dist-zip', ['move-lib', 'qa', 'dist', 'hashres:prod', 'clean:index_dist', 'copy:distZip', 'compress:main', 'replace-lib']);
    grunt.registerTask('start', ['clean:start', 'clean:bower', 'clean:libs', 'bower', 'artifactory:snapshot', 'artifactory:release', 'bower_clean', 'copy:artifactoryLibs', 'copy:libs', 'clean:libs', 'string-replace']);
    grunt.registerTask('test', ['move-lib', 'qa', 'replace-lib']);

    grunt.registerTask('server',['force:on', 'karma:devlocal', 'livereload-start','connect','open','regarde']);
    grunt.registerTask('hub',['regarde']);

};