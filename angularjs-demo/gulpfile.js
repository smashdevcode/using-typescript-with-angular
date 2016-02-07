
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: [
        'node_modules/angular/angular.js',
        'app/scripts/**/*.js'
    ],
    html: ['app/index.html'],
    dist: 'dist'
};

gulp.task('clean', function () {
    return gulp.src(paths.dist + '/**/*', {read: false})
    	.pipe(clean());
});

gulp.task('concat-js', function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['clean', 'concat-js', 'copy-html'], function () {
});
