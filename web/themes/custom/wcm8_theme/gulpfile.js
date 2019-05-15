// Load plugins.
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
// const run = require('gulp-run');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');

// Configuration.
var config = {};
config.pl = {
  removeFiles: [
    'libraries/it-osu-ds/components',
    'libraries/it-osu-ds/pattern-lab',
    'libraries/it-osu-ds/scripts',
    'libraries/it-osu-ds/*.json',
    'libraries/it-osu-ds/*.js',
    'libraries/it-osu-ds/*.lock',
    'libraries/it-osu-ds/*.md',
    'libraries/it-osu-ds/.gitignore',
  ],
};
config.sass = {
  srcFiles: 'sass/main.scss',
  watchFiles: ['sass/main.scss', 'sass/**/*.scss'],
  destDir: 'css',
};

// Delete unnecessary PL files.
function cleanPl(done) {
  return del(config.pl.removeFiles);
  done();
}

// CSS task.
function css(done) {
  return gulp
    .src(config.sass.srcFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(browsersync.stream());
  done();
}

exports.cleanPl = cleanPl;
exports.css = css;
