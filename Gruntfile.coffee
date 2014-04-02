module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON "package.json"

    watch:
      default:
        files: ["src/lib/*.js", "src/js/*.js", "src/html/*.html", "src/css/*.css", "src/img/*.png"]
        tasks: ["copy"]

    clean:
      ["dist/"]

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
      release:
        files: [
          {
            expand: true
            cwd: "src/"
            src: ["lib/*.js", "css/*.css", "img/*.png"]
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

    uglify: {
      default: {
        files: {
          'dist/js/mortgage.min.js': ['src/js/*.js']
        }
      }
    }
        

  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-uglify"

  grunt.registerTask "default", ["clean", "copy", "jasmine"]
  grunt.registerTask "test", ["jasmine"]
  grunt.registerTask "release", ["clean", "copy:release", "uglify", "jasmine"]