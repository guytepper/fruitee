var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    svgmin = require('gulp-svgmin'),
    inlineSvg = require("gulp-inline-svg"),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    processhtml = require('gulp-processhtml');

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./css/*.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('svgo', function() {
  gulp.src('./css/original_svgs/*.svg')
    .pipe(svgmin({
      plugins: [{
        collapseGroups: false
      }]
    }))
    .pipe(gulp.dest('./css/svgo/svgs'));
});

// converts all svgs to use as inline svgs in css file
// * modified inline-svg package to prevent encoding
// * svg-url SASS function handles it instead
gulp.task('inline-svg', function() {
  gulp.src('./css/svgo/svgs/*.svg')
    .pipe(inlineSvg({
      filename: 'fruits.scss',
      template: 'css/svgo/inline-template.mustache'
    }))
    .pipe(gulp.dest('./css/svgo'));
});


// compile fruits.scss to css
gulp.task('iconify', function() {
   return sass('./css/svgo/fruits.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass', function () {
  return sass('css/sass/**/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server : '.',
    open: false,
  });

  gulp.watch('css/sass/**/*.scss', ['sass']);
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch('js/depre.js').on('change', browserSync.reload);
  gulp.watch('js/keyboard.js').on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('css/sass/**/*.scss', ['sass']);
  gulp.watch('js/fruits.js', ['browserify']);
});

gulp.task('ship', ['autoprefixer'], function() {

  gulp.src('index.html')
    .pipe(processhtml())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));

  gulp.src(['./js/fastclick.js'])
    .pipe(gulp.dest('./dist/js/'));

  gulp.src(['./js/utils.js', './js/view.js',  './js/combination.js',
            './js/app.js',  './js/keyboard.js'])
    .pipe(concat('fruitee.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));

  gulp.src('./images/*.*')
    .pipe(gulp.dest('dist/images/'));
});
