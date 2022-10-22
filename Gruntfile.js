function Grunter(grunt) {
  var _dir = grunt.option("target");

  /* load the required npm modules in this space */
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-images');

  /* initialize the grunt.config.init method with the required setup object */
  grunt.config.init({
    gruntTarget: _dir,
    postcss: {
      options: {
        processors: [require('autoprefixer')({browsers: 'last 2 versions'})]
      },
      target: {
        files: [
          {
            expand: true,
            cwd: "./_site/assets/css/",
            src: "<%= gruntTarget %>/*.css",
            dest: "./_site/assets/css/",
            rename: function(dest, src) {
              return dest + src;
            }
          }
        ]
      }
    },
    uglify: {
      options: {
        mangle: {
          keep_fnames: true
        },
        comments: "all",
        compress: false,
        banner: "/*****App Minifed Js Starts Here*****/",
        footer: "/*****App Minified Js Ends Here*****/"
      },
      target: {
        files: {
          "./assets/js/<%= gruntTarget %>/index.min.js": 
          [
            "./assets/js/vendor-components/jquery/jquery-3.3.1.min.js",
            "./assets/js/vendor-components/jquery/jquery.cookie.js",
            "./assets/js/vendor-components/bootstrap/bootstrap.js",
            "./assets/js/common.js",
            "./assets/js/<%= gruntTarget %>/index.js"
          ]
        }
      }
    },
    copy: {
      "./_site/assets/js/<%= gruntTarget %>/index.min.js": "./assets/js/<%= gruntTarget %>/index.min.js"
    },
    clean: {
      pages: "./_site/assets/js/<%= gruntTarget %>/index.js",
      common: [
        "./_site/assets/js/common.js",
        "./_site/assets/js/vendor-components/bootstrap/",
        "./_site/assets/js/vendor-components/jquery",
        "!./_site/assets/js/vendor-components/owl-carousel/**/*.js"
      ]
    },
  });

  /* register the required task for the application that would need to run */
  grunt.task.registerTask("default", ["postcss", "uglify", "copy", "clean"]);
}

module.exports = Grunter;
