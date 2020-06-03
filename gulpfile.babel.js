import gulp from "gulp";
import csso from "gulp-csso";
import browserify from "gulp-bro";
import babelify from "babelify";
import htmlmin from "gulp-htmlmin";
import del from "del";
import autoprefixer from "gulp-autoprefixer";
import cssimport from "gulp-cssimport";
import ghPages from "gulp-gh-pages";

const routes = {
  html: {
    src: "src/index.html",
    dest: "build",
    watch: "src/index.html",
  },
  css: {
    src: "src/css/styles.css",
    dest: "build/css",
    watch: "src/css/*.css",
  },
  js: {
    src: "src/js/app.js",
    dest: "build/js",
    watch: "src/js/app.js",
  },
};

const clean = () => del(["build", ".publish"]);

const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(routes.html.dest));

const css = () =>
  gulp
    .src(routes.css.src)
    .pipe(cssimport())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"], // default, 지원하는 브라우저가 커질 수록 느려짐.
      })
    )
    .pipe(csso())
    .pipe(gulp.dest(routes.css.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      browserify({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const watch = () => {
  gulp.watch(routes.html.watch);
  gulp.watch(routes.js.watch);
  gulp.watch(routes.css.watch);
};

const ghDeploy = () => gulp.src("build/**/*").pipe(ghPages());

export const deploy = gulp.series([clean, html, css, js, ghDeploy, clean]);
