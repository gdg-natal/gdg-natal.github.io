var CSS = [
  'src/css/libs.css',
  'src/css/style.css',
  'node_modules/materialize-css/dist/css/materialize.min.css',
  'node_modules/owlcarousel/owl-carousel/owl.carousel.css',
  'node_modules/owlcarousel/owl-carousel/owl.theme.css',
  'node_modules/font-awesome/css/font-awesome.min.css',
];

var JS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js',
  'node_modules/owlcarousel/owl-carousel/owl.carousel.min.js',
  'src/js/ui.js'
];

module.exports = function (grunt) {

  var task = grunt.task;
  var file = grunt.file;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;
  var _ = grunt.util._;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      site: {
        files: {
          'resources/js/script.min.js': JS
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      site: {
        files: {
          'resources/css/style.min.css': CSS
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/imgs/',
          src: [
            '**/*.{png,jpg,gif}'
          ],
          dest: 'resources/imgs/'
        }]
      }
    },
    watch: {
      dev_site: {
        files: CSS.concat(JS),
        tasks: ['concat_css:site', 'concat:site']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin:site', 'uglify:site']);

};
