module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON "package.json"

    watch:
      default:
        files: ["src/lib/*.js", "src/js/*.js", "src/html/*.html", "src/css/*.css", "src/img/*.png"]
        tasks: ["copy"]

    clean:
      default:
        ["dist/"]
      release:
        ["dist/js/*.js", "!dist/js/mortgage.min.js"]

    copy:
      default:
        files: [
          {
            expand: true
            cwd: "src/"
            src: ["lib/*.js", "js/*.js", "css/*.css", "img/*.png"]
            dest: "dist/"
          }
          {
            expand: true
            flatten: true
            src: ["src/html/*.html"]
            dest: "dist/"
          }
          {
            expand: true
            flatten: true
            src: ["src/img/*.ico"]
            dest: "dist/"
          }
        ]

    jasmine:
      src: ["dist/lib/*.js", "dist/js/*.js"]
      options:
        specs: "src/spec/*.spec.js"
        keepRunner: true

    uglify:
      default:
        files:
          'dist/js/mortgage.min.js': ['src/js/*.js']

    useref:
      html: 'dist/index.html'
      temp: 'dist'
        

  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-useref"

  grunt.registerTask "default", ["clean", "copy", "jasmine"]
  grunt.registerTask "test", ["jasmine"]
  grunt.registerTask "release", ["clean", "copy", "jasmine", "uglify", "useref", "clean:release"]