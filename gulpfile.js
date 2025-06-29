const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function comprimeJavaScript() {
        return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

function comprimeImages() {
    return   gulp.src('source/images/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,svg,SVG}', {encoding: false})
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));

}

function compilaSass(){
        return gulp.src('source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
                    outputStyle: 'compressed'
                }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/styles'));
}


function funcaoPadrao(callback) {
    setTimeout(function() {
    console.log("Executando via Gulp");
    callback();
    }, 2000);
}


function dizoi(callback) {
    setTimeout(function() {
    console.log("olá gulp");
    dizTchau();
    callback();
    }, 1000);
}

function dizTchau(){
    console.log("Tchau Gulp");
}

exports.default = gulp.parallel(funcaoPadrao, dizoi);
exports.dizoi = dizoi;
exports.sass = compilaSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss',{ ignoreInitial: false }, gulp.series(compilaSass));
}

exports.javascript = comprimeJavaScript;
exports.images = comprimeImages;

