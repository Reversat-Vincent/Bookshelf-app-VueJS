// time storage for profiling
console.t = []

// start profiling
console.start = function (k = '') {
  console.t[k] = Date.now()
}

// snapshot profiling
console.snapshot = function (k = '') {
  if (console.t[k] === undefined) {
    return -1
  }
  return Date.now() - console.t[k]
}

// stop profiling
console.stop = function (k = '') {
  const snapshot = console.snapshot(k)
  console.reset(k)
  return snapshot
}

// reset profiling
console.reset = function (k = '') {
  delete console.t[k]
}
