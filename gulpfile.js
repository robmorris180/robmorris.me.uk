var gulp = require('gulp');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var presetEnv = require('postcss-preset-env');
var sourcemaps = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// styles
gulp.task('css', function(){
    gulp.src('src/styl/global.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: false
        }))
        .pipe(postcss([
            presetEnv({
                browsers: ['ie 11', 'last 2 versions']
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

// images
gulp.task('images', function(){
    gulp.src('src/images/**/*')
        .pipe(newer('./dist/images'))
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./dist/images'));
});

// js lint
gulp.task('lint', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
});

// javascript
gulp.task('js', function(){
    gulp.src('src/js/**/*.js')
        .pipe(deporder())
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// run tasks
gulp.task('run', ['images', 'css', 'lint', 'js']);

// watch tasks
gulp.task('watch', function(){
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/styl/**/*.styl', ['css']);
    gulp.watch('src/js/**/*.js', ['lint', 'js']);
});

// default task
gulp.task('default', ['run', 'watch']);