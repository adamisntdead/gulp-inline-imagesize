# gulp-inline-imagesize
> Make comments in your HTML with the size of your images 


## Install

```
$ npm install --save-dev gulp-inline-imagesize
```


## Usage

```js
const gulp = require('gulp');
const inlineImagesize = require('gulp-inline-imagesize');

gulp.task('default', () =>
	gulp.src('src/*.html')
		.pipe(inlineImagesize())
		.pipe(gulp.dest('dist'))
);
```

## Output

An example output is given an image `tree.jpg` thats `1500x500`, 
and the HTML:

```html
<img src="tree.jpg" alt="picture of a tree">
```

The output of running this task would be:

```html
<!-- 1500 x 500 -->
<img src="tree.jpg" alt="picture of a tree">
```

## License

MIT © [Adam Kelly](https://adamisntdead.com)
