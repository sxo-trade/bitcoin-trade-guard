module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    serve: {
      development: {
        options: {
          base: './src',
          indexJade: {
            data: {
              env: 'development'
            }
          }
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './src/bower_components',
          layout: 'byComponent',
          copy: false
        }
      }
    },

    jade: {
      templates: {
        options: {
          client: true,
          amd: true,
          namespace: false,
          data: {
            env: 'production'
          }
        },
        files: [{
          expand: true,
          cwd: './src/js',
          src: '**/*.jade',
          dest: './build/js',
          ext: '.js'
        }]
      },
      static: {
        options: {
          data: {
            env: 'production'
          }
        },
        files: {
          './build/index.html': './src/index.jade'
        }
      }
    },

    requirejs: {
      compile: {
        options: grunt.file.readJSON('build.json')
      }
    },

    less: {
      compile: {
        options: {
        },
        files: {
          './build/css/app.css': './src/css/app.less'
        }
      }
    },

    sass: {
      compile: {
        options: {
          includePaths: [
            './src/bower_components/foundation/scss',
            './src/bower_components/font-awesome/scss',
            './src/bower_components/bourbon/dist'
          ]
        },
        files: {
          './build/css/app.css': './src/css/app.scss'
        }
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: './src/img',
          src: '**',
          dest: './build/img'
        },
        {
          expand: true,
          cwd: './src/fonts',
          src: '**',
          dest: './build/fonts'
        },
        {
          expand: true,
          cwd: './src/bower_components/font-awesome/fonts',
          src: '**',
          dest: './build/fonts'
        },
        {
          expand: true,
          cwd: './src/bower_components/bootstrap/fonts',
          src: '**',
          dest: './build/fonts'
        }]
      }
    },

    clean: {
      build: ['./build'],
      templates: ['./build/js/app']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-sass');

  grunt.loadTasks("./tasks");

  grunt.registerTask('dev', [
    'serve:development'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'jade:templates',
    'requirejs:compile',
    'jade:static',
    'sass:compile',
    'copy:build',
    'clean:templates'
  ]);

  grunt.registerTask('test', []);

  grunt.registerTask('heroku:production', [
    'bower:install',
    'build'
  ]);
};
