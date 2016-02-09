
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint');

var bases = {
    client: 'client/',
    dist: 'dist/',
    nodemodules: 'node_modules/'
};

var paths = {
    app: [
        'app/**/*.module.js',
        'app/**/*.js'
    ],
    libs: [
        'angular/angular.min.js',
        'angular-route/angular-route.min.js',
    ],
    html: [
        'index.html',
        'app/**/*.html'
    ]
};

gulp.task('clean', function () {
    return gulp.src(bases.dist + '**/*', {read: false})
    	.pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src(paths.app, {cwd: bases.client})
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('app', ['clean', 'lint'], function () {
    return gulp.src(paths.app, {cwd: bases.client})
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(bases.dist))
        .pipe(connect.reload());
});

gulp.task('copy-html', ['clean'], function () {
    return gulp.src(paths.html, {cwd: bases.client})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-lib', ['clean'], function () {
    return gulp.src(paths.libs, {cwd: bases.nodemodules})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('build', ['app', 'copy-html', 'copy-lib']);

gulp.task('watch', function () {
    gulp.watch(paths.html.concat(paths.app), {cwd: bases.client}, ['build']);
});

gulp.task('serve', ['build', 'watch'], function () {
    connect.server({
        root: bases.dist,
        livereload: true
    });
});

gulp.task('default', ['build']);
