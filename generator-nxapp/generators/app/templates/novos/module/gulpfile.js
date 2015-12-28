var gulp = require('gulp'),
    del = require('del'),
    series = require('stream-series'),
    nxBuilder = require('nx-gulp-module-builder');

gulp.task('clean', function () {
    return del(['dist', 'qa']);
});

gulp.task('test', function (cb) {
    nxBuilder.runKarma('test/karma.conf.js', {
        autoWatch: false,
        singleRun: true
    }, cb);
});

gulp.task('build', function () {
    var streams = [];
    var modules = nxBuilder.getModules();
    for (var i = 0; i < modules.length; i++) {
        streams.push(nxBuilder.applyRules(modules[i]));
    }
    streams.push(nxBuilder.buildConfigJson());
    //return series(streams);
});

gulp.task('default', ['clean', 'test', 'build']);
