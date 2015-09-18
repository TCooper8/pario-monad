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

singleCache[0] = (iterable, offset, acc) => {
  return acc
  //return acc + iterable[iterable.length - 1]
}

module.exports = (iterable, acc) => {
  let length = iterable.length

  let mod = length % cacheLimit
  if (length >= cacheLimit) {
    acc = multiCache[cacheLimit](iterable, 0, length - mod, acc)
  }

  return singleCache[mod](iterable, length - mod, acc)
}


