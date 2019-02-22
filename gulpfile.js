//imports
const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
//const stylelint = require('stylelint');
//sass.compiler = require('node-sass');

function serve() {
  return connect.server({
    root: 'dist',
    livereload: true
  });
}
 
function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
}

// gulpStylelint must be applied before sass() function
function styles() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
}

function scripts() {
  return gulp.src([ './src/js/**/*.js', 
                    './node_modules/jquery/jquery.js', 
                    './node_modules/popper.js/dist/umd/popper.js', 
                    './node_modules/bootstrap/dist/js/bootstrap.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
}
 
function watch() {
  gulp.watch(['./src/*.html'], html);
  gulp.watch(['./src/scss/**/*.scss'], styles );
  gulp.watch(['./src/js/**/*.js'], scripts);
}

const build = gulp.parallel(html, styles, scripts);

exports.build = build; 
exports.default = gulp.series(build, gulp.parallel(serve, watch))
