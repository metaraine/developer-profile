var gulp          = require('gulp')
var notify        = require('gulp-notify')
var sass          = require('gulp-sass')
var stylus        = require('gulp-stylus')
var nib           = require('nib')
var autoprefixer  = require('gulp-autoprefixer')
var minifycss     = require('gulp-minify-css')
var concat        = require('gulp-concat')
var rename        = require('gulp-rename')
var es            = require('event-stream')
var plumber       = require('gulp-plumber')
var livereload    = require('gulp-livereload')
var jade          = require('gulp-jade')
var browserify    = require('browserify')
var source        = require('vinyl-source-stream')
var buffer        = require('vinyl-buffer')
var sourcemaps    = require('gulp-sourcemaps')
var notifyOnError = notify.onError("<%= error.message %>")

var config = {
  srcCss: 'src/style/**/*.css',
  srcStylus: 'src/style/**/*.styl',
  srcSass: 'src/style/**/*.s*ss',
  destCss: 'public/style',
  cssConcatTarget: 'main.css',
  srcViews: 'src/*.jade',
  destViews: 'public',
  srcScripts: 'src/script/**/*.js',
  srcAppScript: 'src/script/app.js',
  destScripts: 'public/script',
  destBundle: 'bundle.js'
}

gulp.task('styles', function() {

  var css = gulp.src(config.srcCss)

  var stylusStream = gulp.src(config.srcStylus)
    .pipe(plumber({ errorHandler: notifyOnError }))
    .pipe(stylus({ use: [nib()] }))

  var sassStream = gulp.src(config.srcSass)
    .pipe(plumber({ errorHandler: notifyOnError }))
    .pipe(sass({ indentedSyntax: true }))

  return es.merge(css, sassStream, stylusStream)
    .pipe(concat(config.cssConcatTarget))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(config.destCss))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.destCss))
    .pipe(livereload({ auto: false }))
})

gulp.task('views', function () {
  return gulp.src(config.srcViews)
    .pipe(jade())
    .pipe(gulp.dest(config.destViews))
    .pipe(livereload({ auto: false }))
})

gulp.task('scripts', function () {
  return browserify(config.srcAppScript)
    .bundle()
    .pipe(source(config.destBundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.destScripts))
    .pipe(livereload({ auto: false }))
})

gulp.task('watch', function () {
  gulp.watch([config.srcStylus, config.srcSass], ['styles'])
  gulp.watch(config.srcScripts, ['scripts'])
  gulp.watch(config.srcViews, ['views'])
})

gulp.task('default', ['styles', 'scripts', 'views'])
