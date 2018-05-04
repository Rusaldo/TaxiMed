'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var run = require('run-sequence');
var del = require('del');
var uglifyjs = require('gulp-uglify');
var pump = require('pump');
var ghPages = require('gulp-gh-pages');

gulp.task('uglify', function (cb) {
  pump([
        gulp.src('js/app.js'),
        uglifyjs(),
        gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
})

gulp.task('images', function() {
  return gulp.src('img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('img'));
});

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html', ['html']);
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**',
    'js/**'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
})

gulp.task('build', function(done) {
  run(
    'clean',
    'copy',
    'style',
    'uglify',
    'html',
    done
  );
});
