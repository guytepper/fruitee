var gulp 		      = require('gulp'),
 	sass 		        = require('gulp-sass'),
  browserSync     = require('browser-sync').create(),
	injectPartials  = require('gulp-inject-partials'),
  inlineSvg       = require("./src/js/vendor/gulp-inline-svg"),
  concat          = require('gulp-concat'),
  processhtml     = require('gulp-processhtml');

// Handles partials injection on index.html 
gulp.task('index', function () {
  return gulp.src('./src/html/index.html')           
           .pipe(injectPartials({
             removeTags: true
           }))
           .pipe(processhtml())
           .pipe(gulp.dest('./dist'));
});

// Compiles style.scss & fruits.scss files
gulp.task('sass', ['inline-svg'], function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
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
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));
});

// Concats all js files
gulp.task('js', function() {
  return gulp.src(['./src/js/utils.js', './src/js/view.js',  './src/js/combination.js',
          './src/js/app.js',  './src/js/keyboard.js'])
  .pipe(concat('fruitee.js'))
  .pipe(gulp.dest('./dist/js/'));
});

// Builds the app in ./dist
gulp.task('build', ['index', 'inline-svg', 'sass', 'js', 'images']);

gulp.task('serve', function() {
  browserSync.init({
    server : './dist',
    open: true,
  });

  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/html/index.html').on('change', browserSync.reload);
});