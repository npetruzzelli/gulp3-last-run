/**
 * An implementation of Gulp 4.x's `lastRun` method for Gulp 3.x.
 *
 * @see  {@link https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulplastruntaskname-timeresolution}
 * @see  {@link https://github.com/gulpjs/last-run}
 */
var lastRun = require('last-run')

function getTask(gulpInstance, taskName) {
  if (typeof taskName !== 'string' && !(taskName instanceof String)) {
    throw new TypeError('getTask: provided task name must be a string.')
  }
  var task = gulpInstance.tasks[taskName]
  if (!task) {
    throw new ReferenceError(
      "getTask: Task '" + taskName + "' is not in your gulpfile"
    )
  }
  return task.fn
}

function gulp3LastRun(gulpInstance) {
  function captureLastRun(taskName, timestamp) {
    lastRun.capture(getTask(gulpInstance, taskName), timestamp)
  }

  function releaseLastRun(taskName) {
    lastRun.release(getTask(gulpInstance, taskName))
  }

  function retrieveLastRun(taskName, timeResolution) {
    return lastRun(getTask(gulpInstance, taskName), timeResolution)
  }

  function retrieveThenCaptureLastRun(taskName, options) {
    options = options || {}
    var timeResolution = options.retrieveTimeResolution
    var timestamp = options.captureTimestamp
    var retrievedLastRun = retrieveLastRun(taskName, timeResolution)
    captureLastRun(taskName, timestamp)
    return retrievedLastRun
  }

  return {
    capture: captureLastRun,
    release: releaseLastRun,
    retrieve: retrieveLastRun,
    retrieveThenCapture: retrieveThenCaptureLastRun
  }
}

module.exports = gulp3LastRun
