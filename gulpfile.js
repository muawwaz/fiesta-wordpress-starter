const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('sass', () => {
    return gulp.src(['./scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            postcssPresetEnv()
        ]))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('babel', () => {
    return gulp.src([
        './js/vendor/polyfills.js',
        './js/fiesta/Core.js',
        './js/fiesta/Component.js',
        './js/fiesta/CookieConsent.js',
        './js/fiesta/Overlay.js',
        './js/Header.js',
        './js/Navigation.js',
        './js/App.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            ignore: ['./js/vendor']
        }))
        .pipe(concat("./script.js"))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('browser-sync', function() {
    
});

gulp.task('watch', () => {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/**/*.js', gulp.series(['babel']));
});

gulp.task('default', gulp.series(['sass', 'babel', 'watch']));
gulp.task('build', gulp.series(['sass', 'babel']));