// logs storage
console.logs = []

// neutral log
console.l = function (val, key = null) {
  console.logs.push({
    date: Date.now(),
    type: 'log',
    key: key,
    val: val,
  })
}

// warning log
console.w = function (val, key = null) {
  console.logs.push({
    date: Date.now(),
    type: 'warning',
    key: key,
    val: val,
  })
}

// success log
console.s = function (val, key = null) {
  console.logs.push({
    date: Date.now(),
    type: 'success',
    key: key,
    val: val,
  })
}

// error log
console.e = function (val, key = null) {
  console.logs.push({
    date: Date.now(),
    type: 'error',
    key: key,
    val: val,
  })
}
