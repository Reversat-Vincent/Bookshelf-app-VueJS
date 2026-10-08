// slugify
String.prototype.slugify = function (separator = '-') {
  return this.toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '-') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/[\s|-]+/g, separator)
}

// capitalize
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// first
String.prototype.first = function () {
  return this.charAt(0)
}

// last
String.prototype.last = function () {
  return this.charAt(this.length - 1)
}

// distinct
Array.prototype.distinct = function () {
  return this.filter((value, index, array) => array.indexOf(value) === index)
}
