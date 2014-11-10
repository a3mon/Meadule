var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var basePath= {
    src: 'src/',
    dist: 'dist/',
    libs: 'libs/'
}

var srcAssets = {
    js: basePath.src + 'js/',
    css: basePath.src + 'css/',
    images: basePath.src + 'images/',
    api: basePath.src + 'api/'
}

var distAssets = {
    js: basePath.dist + 'js/',
    css: basePath.dist + 'css/',
    images: basePath.dist + 'images/',
    api: basePath.dist + 'api/'
}

// Lint Task
var lint = function(files) {
    files.pipe(jshint())
        .pipe(jshint.reporter('default'));
} 
gulp.task('lint', function() {
    lint(gulp.src(srcAssets.js + '**/*.js'));
});

// Concatenate & Minify JS
var scripts = function(files) {
    files.pipe(concat('all.js'))
        .pipe(gulp.dest(distAssets.js))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distAssets.js));
}
gulp.task('scripts', function() {
    scripts(gulp.src(srcAssets.js + '**/*.js'));
        
});

// Copy sources
var copySources = function(files, dist) {
    console.log(files);
    console.log(dist);
    files.pipe(gulp.dest(dist));
}
gulp.task('copySources', function() {
    copySources(gulp.src([
            basePath.src + '*.html',
            srcAssets.css + '**/*.css',
            srcAssets.images + '**/*.*',
            srcAssets.api + '**/*.json'
        ], {
            base: basePath.src
        }), basePath.dist);
});

// Copy libs
gulp.task('copyLibs', function() {
    copySources(gulp.src(basePath.libs + 'bootstrap/dist/css/bootstrap.min.css'), distAssets.css);
    copySources(gulp.src([
            basePath.libs + 'angular/angular.min.js',
            basePath.libs + 'angular/angular.js',
            basePath.libs + 'angular/angular.min.js.map'
        ], {
            base: basePath.libs + 'angular/'
        }), distAssets.js);
    copySources(gulp.src([
            basePath.libs + 'angular-resource/angular-resource.min.js',
            basePath.libs + 'angular-resource/angular-resource.js',
            basePath.libs + 'angular-resource/angular-resource.min.js.map'
        ], {
            base: basePath.libs + 'angular-resource/'
        }), distAssets.js);
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

    watch([
            basePath.src + '*.html',
            srcAssets.css + '**/*.css',
            srcAssets.images + '**/*.*',
            srcAssets.api + '**/*.json'
        ], function(files) {
            console.log('copying');
            copySources(files, basePath.dist);
            console.log('copied');
            return files;
        });

    //gulp.watch('src/*.html', ['copySources']);
    //gulp.watch('src/css/*.css', ['copySources']);
    //gulp.watch('src/images/**', ['copySources']);
    //gulp.watch('src/api/**', ['copySources']);

    gulp.watch('libs/**', ['copyLibs']);
    gulp.watch('dist/**', ['livereload']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'copySources', 'copyLibs', 'webserver', 'watch']);