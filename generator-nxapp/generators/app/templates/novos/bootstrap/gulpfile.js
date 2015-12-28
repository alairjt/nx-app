var gulp = require('gulp'),
    connect = require('gulp-connect'),
    utils = require('./utils/utils');

gulp.task('connect', function () {
    connect.server({
        port: 9000,
        hostname: "localhost",
        livereload: {
            port: utils.livereloadPort
        },
        middleware: function (connect, options) {
            return utils.getConnects(connect);
        }
    });
});

gulp.task('default', ['connect']);
