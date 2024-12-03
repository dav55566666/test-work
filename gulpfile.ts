const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('scripts'));