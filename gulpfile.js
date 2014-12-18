var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var smoosher = require('gulp-smoosher');

gulp.task('default', function() {
  gulp.src('src/index.html')
    .pipe(smoosher())
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('.'))
});