const gulp = require("gulp");
const pump = require("pump");

const composer = require("gulp-uglify/composer");
const uglifyjs = require("uglify-es");
const uglify = composer(uglifyjs, console);
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const del = require("del");

const useref = require("gulp-useref");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

gulp.task("sass", function() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("useref", function() {
  return gulp
    .src("src/index.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src("src/img/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("fonts", function() {
  return gulp.src("src/fonts/**").pipe(gulp.dest("dist/fonts"));
});

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("src/style.css", browserSync.reload);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/*.js", browserSync.reload);
});

gulp.task("watch:sass", ["sass"], function() {
  gulp.watch("src/scss/style.scss", ["sass"]);
});

// BrowserSync!!!!!!!!
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});

gulp.task(
  "build",
  ["clean:dist", "fonts", "images", "sass", "useref"],
  function() {
    console.log("Website ready for deployment");
  }
);

gulp.task("serve", ["watch"], function() {
  console.log("Server running!");
});
