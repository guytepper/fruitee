var gulp = require('gulp');
var injectPartials = require('gulp-inject-partials');

gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
           .pipe(injectPartials({
             removeTags: true
           }))
           .pipe(gulp.dest('./dist'));
});
