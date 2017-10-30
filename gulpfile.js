'use strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');


/* styles tasks */

gulp.task('styles:dev', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('./themes/callmenick/static/css'));
});

gulp.task('styles:prod', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest('./themes/callmenick/static/css'));
});

/* dev tasks */

gulp.task('start:dev', ['styles:dev'], function() {
  gulp.watch('./src/sass/**/*.scss', ['styles:dev']);
});

/* build tasks */

gulp.task('build:dev', ['styles:dev']);

gulp.task('build:prod', ['styles:prod']);

/* default tasks */

gulp.task('default', ['build:dev']);
