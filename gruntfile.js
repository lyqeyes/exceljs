'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['./lib/**/*.js', './spec/browser/*.js'],
            dest: './build/',
          },
        ],
      },
      bundle: {
        files: [
          {
            cwd: './build',
            expand: true,
            src: ['exceljs.bare.js', 'exceljs.js'],
            dest: './dist/',
          },
        ],
      },
    },
    browserify: {
      bare: {
        src: ['./build/lib/exceljs.bare.js'],
        dest: './build/exceljs.bare.js',
        options: {
          browserifyOptions: {
            standalone: 'ExcelJS',
          },
        },
      },
      bundle: {
        src: ['./build/lib/exceljs.browser.js'],
        dest: './build/exceljs.js',
        options: {
          browserifyOptions: {
            standalone: 'ExcelJS',
          },
        },
      },
      spec: {
        src: ['./build/spec/browser/exceljs.spec.js'],
        dest: './build/web/exceljs.spec.js',
      },
    },
    terser: {
      options: {
        sourceMap: true,
        output: {
          preamble: '/*! ExcelJS <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        },
      },
      dist: {
        files: {
          './dist/exceljs.min.js': ['./dist/exceljs.js'],
          './dist/exceljs.bare.min.js': ['./dist/exceljs.bare.js'],
        },
      },
      // es3: {
      //   files: [
      //     {
      //       expand: true,
      //       cwd: './build/lib/',
      //       src: ['*.js', '**/*.js'],
      //       dest: 'dist/es3/',
      //       ext: '.js',
      //     },
      //     {
      //       './dist/es3/index.js': ['./build/lib/exceljs.nodejs.js'],
      //     }
      //   ],
      // },
    },

    copy: {
      dist: {
        files: [
          {expand: true, src: ['**'], cwd: './build/lib', dest: './dist/es5'},
          {src: './build/lib/exceljs.nodejs.js', dest: './dist/es5/index.js'},
          {src: './LICENSE', dest: './dist/LICENSE'},
        ],
      },
    },

    jasmine: {
      dev: {
        src: ['./dist/exceljs.js'],
        options: {
          specs: './build/web/exceljs.spec.js',
        },
      },
    },
  });

  grunt.registerTask('build', ['babel:dist', 'browserify', 'babel:bundle', 'terser', 'copy']);
  grunt.registerTask('ug', ['terser']);
};
