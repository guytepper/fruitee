var gulp 		     = require('gulp'),
 	sass 		       = require('gulp-sass'),
	injectPartials = require('gulp-inject-partials'),
  inlineSvg      = require("./src/js/vendor/gulp-inline-svg");

gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
           .pipe(injectPartials({
             removeTags: true
           }))
           .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// converts all svgs to use as inline svgs in css file
// * modified inline-svg package to prevent encoding
// * svg-url SASS function handles it instead
gulp.task('inline-svg', function() {
  gulp.src('./src/fruit-icons/*.svg')
    .pipe(inlineSvg({
      filename: 'fruits.scss',
      template: './src/fruit-icons/inline-template.mustache'
    }))
    .pipe(gulp.dest('./src/sass/'));
});

// compile fruits.scss to css
gulp.task('iconify', function() {
   return gulp.src('./src/sass/fruits.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
