const babel = require('gulp-babel')
const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const plumber = require('gulp-plumber')

gulp.task('pre-test', () => {
  gulp.src('./bin/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], () => {
  gulp.src('./test/*.js')
    .pipe(plumber())
    .pipe(mocha())
    .pipe(istanbul.writeReports())
})

gulp.task('transpile', () => {
  gulp.src('./src/*.js')
    .pipe(babel({
      presets: [ 'babel-preset-es2015' ]
    }))
    .pipe(gulp.dest('./bin'))
})

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['transpile', 'test'])
  gulp.watch('./test/*.js', ['transpile', 'test'])
})

gulp.task('default', ['transpile', 'test', 'watch'])
