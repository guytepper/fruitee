/* eslint-disable */

var gulp 		      = require('gulp'),
  util            = require('gulp-util');
 	sass 		        = require('gulp-sass'),
  browserSync     = require('browser-sync').create(),
	injectPartials  = require('gulp-inject-partials'),
  inlineSvg       = require("gulp-inline-svg"),
  uglify          = require('gulp-uglify'),
  prefix          = require('gulp-autoprefixer'),
  cssmin          = require('gulp-cssmin'),
  processhtml     = require('gulp-processhtml'),
  rollup          = require('rollup'),
  buble           = require('rollup-plugin-buble');

var config = {
  production: !!util.env.production
}

// Handles partials injection on index.html
gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
           .pipe(injectPartials({
             removeTags: true
           }))
           .pipe(config.production ? processhtml() : util.noop())
           .pipe(gulp.dest('./dist'))
           .pipe(browserSync.stream());
});

// Compiles, prefixes and minifies style.scss & fruits.scss
gulp.task('sass', ['inline-svg'], function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({ browsers: ['last 3 versions'] }))
    .pipe(config.production ? cssmin() : util.noop())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// Converts all SVG file for inline usage
// * modified inline-svg package and added custom encode function
gulp.task('inline-svg', function() {
  return gulp.src('./src/fruit-icons/*.svg')
    .pipe(inlineSvg({
      filename: 'fruits.scss',
      template: './src/fruit-icons/inline-template.mustache'
    }))
    .pipe(gulp.dest('./src/sass/'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

// Bundle JS modules
// TODO: uglify?
gulp.task('rollup', function() {
  var entry   = './src/js/app.js';
  var dest    = './dist/js/app.js';
  var plugins = [
    buble(),
  ];
  rollup.rollup({ entry, plugins }).then(bundle => {
    bundle.write({
       format: 'es',
       dest: dest,
       sourceMap: true,
       sourceMapFile: dest
     });
  }).catch(err => {
    console.log(err);
  });

  // Minify for production
  if (config.production) {
    gulp.src(dest)
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
  }
});

// Builds the app in ./dist
gulp.task('build', ['index', 'inline-svg', 'sass', 'rollup', 'images'], function() {
  gulp.src(['./src/html/*', '!./src/html/*.html'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server : './dist',
    open: false
  });

  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(['src/js/*.js', 'src/js/components/*.js'], ['rollup']).on('change', browserSync.reload);
  gulp.watch('src/html/**/*.html', ['index']);
});
