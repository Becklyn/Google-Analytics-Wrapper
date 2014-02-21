module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        uglify: {
            dist: {
                options: {
                    banner: '/* Copyright Becklyn <%= grunt.template.today("yyyy") %>, Licensed under BSD-3-Clause */',
                    compress: true,
                    beautify: false,
                    report: 'gzip'
                },
                files: {
                    'dist/google-analytics-wrapper.min.js': 'google-analytics-wrapper.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['uglify']);
};