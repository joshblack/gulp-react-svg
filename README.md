# `gulp-react-svg`

> Convert input SVG elements to React Stateless Functional Components.

Given a set of icon names, and sizes, convert them into a single React Component that you can call like `<AddIcon size="16" />`.

The current convention is for icons to be named like: `Icon_Name_Size`. For example:

- `Add_16.svg`
- `Additional_Options_16.svg`
- `Additional_Options_24.svg`
- `Additional_Options_64.svg`

It will try and consolidate all the sizes into a single component, such as `AdditionalOptionsIcon`, and gives you access to the `size` prop to determine which icon size you want.

## Usage

```bash
npm install gulp-react-svg --save-dev
```

```js
// gulpfile.js

const reactSVG = require('gulp-react-svg');

gulp.task('svg-to-component', ['clean'], () => {
  return gulp.src('./src/svg/**/*.svg')
    .pipe(reactSVG())
    .pipe(gulp.dest('./'));
});
```

