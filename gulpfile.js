var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    inlineSvg = require("gulp-inline-svg"),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    processhtml = require('gulp-processhtml');

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    // var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
 
    return gulp.src('./css/style.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
        // .pipe(sourcemaps.write('.'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('inline-svg', function() {
  gulp.src('./css/svgo/svgs/*.svg')
    .pipe(inlineSvg({
      template: 'css/svgo/inline-template.mustache'
    }))
    .pipe(gulp.dest('./css/svgo'));
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
    // open: false,
  });

  gulp.watch('css/sass/**/*.scss', ['sass']);
  gulp.watch('index.html').on('change', browserSync.reload);
  // gulp.watch('js/fruits.js', ['browserify']).on('change', browserSync.reload);
  gulp.watch('js/depre.js').on('change', browserSync.reload);
  gulp.watch('js/keyboard.js').on('change', browserSync.reload);
});

// gulp.task('browserify', function() {
//     var b = browserify();
//     b.add('js/fruits.js');

//     return b.bundle()
//       .on('error', function(err) { console.log(err); })
//       .pipe(source('./js/main.js'))
//       .pipe(gulp.dest('js/'));
// });

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

  gulp.src(['./js/depre.js', './js/keyboard.js'])
    .pipe(concat('fruitee.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));

  gulp.src('./images/*.*')
    .pipe(gulp.dest('dist/images/'));

  gulp.src(['apple-touch-icon-180x180.png', 'favicon.ico'])
    .pipe(gulp.dest('dist'));
});