import gulp from "gulp";
import del from "del";
import htmlmin from "gulp-htmlmin";
import browserify from "gulp-bro";
import babelify from "babelify";
import cssimport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import ghPages from "gulp-gh-pages";
import ws from "gulp-webserver";

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

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const ghDeploy = () => gulp.src("build/**/*").pipe(ghPages());

const assets = gulp.series([clean, html, css, js]);
const live = gulp.series([webserver, watch]);

export const build = gulp.series([assets]);
export const dev = gulp.series([assets, live]);
export const deploy = gulp.series([assets, ghDeploy, clean]);
