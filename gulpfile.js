var gulp 		     = require('gulp'),
 	sass 		       = require('gulp-sass'),
	injectPartials = require('gulp-inject-partials'),
  inlineSvg      = require("./src/js/vendor/gulp-inline-svg");

// Handles partials injection on index.html 
gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
           .pipe(injectPartials({
             removeTags: true
           }))
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

// Builds the app in ./dist
gulp.task('build', ['index', 'inline-svg', 'sass']);
