
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint');

var bases = {
    app: 'app/',
    dist: 'dist/',
    nodemodules: 'node_modules/'
};

var paths = {
    scripts: [
        'scripts/**/*.js'
    ],
    libs: [
        'angular/angular.min.js',
    ],
    html: [
        'index.html'
    ]
};

gulp.task('clean', function () {
    return gulp.src(bases.dist + '**/*', {read: false})
    	.pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('scripts', ['clean', 'lint'], function () {
    return gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(bases.dist))
        .pipe(connect.reload());
});

gulp.task('copy-html', ['clean'], function () {
    return gulp.src(paths.html, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-lib', ['clean'], function () {
    return gulp.src(paths.libs, {cwd: bases.nodemodules})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('build', ['scripts', 'copy-html', 'copy-lib']);

gulp.task('watch', function () {
    gulp.watch(paths.html.concat(paths.scripts), {cwd: bases.app}, ['build']);
});

gulp.task('webserver', ['build', 'watch'], function () {
    connect.server({
        root: bases.dist,
        livereload: true
    });
});

gulp.task('default', ['build']);
