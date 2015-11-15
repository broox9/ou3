var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var cssMin = require('gulp-cssmin');
var cssConcat = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

var paths = {
  app: [
    'src/js/**/*.js'
  ],
  vendor: [
    'bower_components/jquery/dist/jquery.min.js',
    'ower_components/lodash/dist/lodash.min.js',
    // 'src/bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-touch/angular-touch.min.js',
    // 'src/bower_components/angular-hammer/angular-hammer.js',
    // 'src/bower_components/angular-gestures/gestures.min.js',
    'bower_components/angular-animate/angular-animate.js'
  ],
  css: [
    'bower_components/sanitize-css/sanitize.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'src/css/**/*.css'
  ]
}

gulp.task('default',['clean','build:js:app', 'build:js:vendor', 'build:css']);

gulp.task('clean', function() {
  var deletedPaths = del.sync(['public/bundle/**']);
  console.log("DELETED ", deletedPaths.join('\n'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['src/bower_components/font-awesome/fonts/fontawesome-webfont.*'])
      .pipe(gulp.dest('public/fonts/'));
});

gulp.task('build:js:app', function() {
  gulp.src(paths.app)
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat({path: 'application.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/bundle'));
});

gulp.task('build:js:vendor', function() {
  gulp.src(paths.vendor)
    .pipe(concat({path: 'vendor.js'}))
    .pipe(gulp.dest('public/bundle'));
});

gulp.task('build:css', function() {
  gulp.src(paths.css)
    // .pipe(cssMin())
    .pipe(cssConcat('application.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/bundle') );
});


gulp.task('watch', function() {
  var pathArray = [].concat(paths.app, paths.css);
  pathArray.push('gulpfile.js');

  watch(pathArray, function() {
    gulp.start(['clean', 'default']);
  })
});
