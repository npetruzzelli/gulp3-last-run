# Gulp 3 Last Run

An implementation of Gulp 4.x's `lastRun` method for Gulp 3.x.

This is a utility, not a plugin. It does not act on files or streams nor does it meet other requirements defined by Gulp to be considered a plugin.

## Why?

To take advantage of a helpful feature from Gulp 4.x without waiting for it to be released or upgrading from 3.x to 4.x.

The original intent is to provide a value that can be used for filtering.

## Installation

```
npm install --save-dev gulp3-last-run
```

## Usage

Use **Gulp 3 Last Run** in combination with [**gulp-filter-since**](https://github.com/npetruzzelli/gulp-filter-since).

```javascript
const gulp = require('gulp');
const gulp3LastRun = require('gulp3-last-run');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();
const taskLastRun = gulp3LastRun(gulp);

gulp.task('scripts', function(){
  const lastRunMs = taskLastRun.retrieveThenCapture('scripts');
  return gulp.src('app/scripts/**/*.js')
    .pipe($.filterSince(lastRunMs))
    .pipe($.babel())
    .pipe(gulp.dest('dist/scripts'))
  ;
});

gulp.task('watch', ['scripts'], function(){
  gulp.watch('app/scripts/**/*.js', ['scripts']);
});
```

## Methods

### `gulp3LastRun(gulpInstance)`

Returns a plain object containing static methods that act on a reference to a gulp object to get and set last run times. It is basically a wrapper for the [**last-run**](https://github.com/gulpjs/last-run) module.

### `taskLastRun.retrieveThenCapture(taskName, options)`

`retrieveThenCapture` is a convenience method not found in the last-run module. It executes the `retrieve` method then the `capture` method with a single method call.

The `taskName` is a string that is used to retrieve the task function from the gulp instance. The task function is then used as the `fn` argument for last-run module method arguments.

1.  Retrieves the current last run for a given task 
2.  Immediately captures a new last run time
3.  Returns the retrieved last run value (whatever it was before the capture)

Options for each method can be provided as option and will be passed to their respective methods if provided.

-   `options.retrieveTimeResolution`
-   `options.captureTimestamp`

### `taskLastRun.capture(taskName, timestamp)`, `taskLastRun.release(taskName)`, and `taskLastRun.retrieve(taskName, timeResolution)`

The `taskName` is a string that is used to retrieve the task function from the gulp instance. The task function is then used as the `fn` argument for last-run module method arguments.

Other arguments are passed directly to their last-run module counterparts. gulp3-last-run's `retrieve` method is the counter part for last-run's main method.

See [last-run's API documentation](https://github.com/gulpjs/last-run#api) for more information about each of these methods.
