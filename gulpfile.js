var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var cssMin = require('gulp-cssmin');
var cssConcat = require('gulp-concat-css');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  app: [
    'src/js/**/*.js'
  ],
  vendor: [
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/lodash/dist/lodash.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-hammer/angular-hammer.min.js',
    'src/bower_components/angular-gestures/gestures.min.js',
    'src/bower_components/angular-animate/angular-animate.js'
  ],
  css: [
    'src/bower_compoents/normalize-css/normalize.css',
    'src/css/**/*/css'
  ]
}

gulp.task('default',['build:js:app', 'build:js:vendor', 'build:css']);

//TODO: clean task using 'del'

gulp.task('build:js:app', function() {
  gulp.src(paths.app)
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat({path: 'application.js'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/bundle') );
});

gulp.task('build:js:vendor', function() {
  gulp.src(paths.vendor)
    .pipe(cssConcat({path: 'vendor.js'}))
    .pipe(gulp.dest('public/bundle'));
});

gulp.task('build:css', function() {
  gulp.src(paths.css)
    // .pipe(cssMin())
    .pipe(cssConcat('application.css'))
    .pipe(gulp.dest('public/bundle') );
});

gulp.task('clean', function() {

});
