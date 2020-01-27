const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(dest('./themes/callmenick/static/css'));
}

function dev() {
  watch(['./src/sass/**/*.scss'], {}, parallel(styles));
}

exports.styles = styles;
exports.dev = dev;
exports.build = parallel(styles);
exports.default = parallel(styles);
