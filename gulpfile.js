var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');

// gulp.task('default', function() {
//   // place code for your default task here
// });


// gulp.task('default', function() {
//   // Do something that "builds stuff"
//   var stream = gulp.src('components/conformity-cr/*.js')
//   .pipe(gulp.dest('build')); 

//   return stream;
//   });

  gulp.task('default', function (cb) {
  pump([
        gulp.src('app/**/*.js'),
        uglify(),
        gulp.dest('build')
    ],
    cb
  );
});


  gulp.task('default', function (cb) {
  pump([
        gulp.src('components/**/*.js'),
        uglify(),
        gulp.dest('components_Build')
    ],
    cb
  );
});