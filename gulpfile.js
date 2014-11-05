var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// Lint Task
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Copy sources
gulp.task('copySources', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/css/*css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/images/**')
        .pipe(gulp.dest('dist/images'));
});

// Copy libs
gulp.task('copyLibs', function() {
    gulp.src('libs/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src([
            'libs/angular/angular.min.js',
            'libs/angular/angular.js',
            'libs/angular/angular.min.js.map'
        ], {
            base: 'libs/angular'
        })
        .pipe(gulp.dest('dist/js'));
});

// Connect wevserver
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: ['dist']
    });
});

gulp.task('livereload', function() {
    gulp.src('dist/**')
        .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.html', ['copySources']);
    gulp.watch('src/css/*.css', ['copySources']);
    gulp.watch('src/images/**', ['copySources']);
    gulp.watch('dist/**', ['livereload']);
    gulp.watch('libs/**', ['copyLibs']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'copySources', 'copyLibs', 'webserver', 'watch']);