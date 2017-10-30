'use strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');


/* styles tasks */

gulp.task('styles', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest('./themes/callmenick/static/css'));
});

/* dev tasks */

gulp.task('watch', ['styles'], function() {
  gulp.watch('./src/sass/**/*.scss', ['styles']);
});

/* build tasks */

gulp.task('build', ['styles']);

/* default tasks */

gulp.task('default', ['build']);
