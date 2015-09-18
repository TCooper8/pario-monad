'use strict'

let makeMorphIterN = require('./makeSumIterN.js')
let _ = require('lodash')

let cacheLimit = 16
let cacheRange = _.range(cacheLimit + 1)

let multiCache = _.reduce(cacheRange, (acc, i) => {
  if (i > 0) {
    acc[i] = makeMorphIterN(i)
  }
  return acc
}, Object())

let singleCache = _.reduce(cacheRange, (acc, i) => {
  if (i > 0) {
    acc[i] = makeMorphIterN.single(i)
  }
  return acc
}, Object())

singleCache[0] = (iterable, offset, predicate, acc) => {
  return acc
}

module.exports = (iterable, predicate) => {
  let length = iterable.length
  let acc = true

  let mod = length % cacheLimit
  if (length >= cacheLimit) {
    acc = multiCache[cacheLimit](iterable, 0, length - mod, predicate)
  }

  return singleCache[mod](iterable, length - mod, predicate, acc)
}


