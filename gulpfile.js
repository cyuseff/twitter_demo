'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var server = require('gulp-server-livereload');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var iife = require("gulp-iife");

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// add custom browserify options here
var customOpts = {
  entries: ['./app_client/src/app.jsx'],
  debug: true,
  fullPaths: true,
  extensions: ['.jsx']
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
b.transform(babelify, {presets: ["es2015", "react"]});

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
       .pipe(iife())
       .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./app_client/'));
}


gulp.task('serve', function(done) {
  gulp.src('./app_client')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true);
          } else if(/style.css/.test(filePath)) {
            cb(true);
          }
        }
      },
      open: true,
      defaultFile: '/index.html'
    }));
});

gulp.task('sass', function () {
  return gulp.src('./app_client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./app_client/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'serve', 'sass', 'watch']);
