'use strict'

let makeMorph = require('./makeMorphIterN.js')
let _ = require('lodash')

exports.makeOpReduce = (operator) => {
  let cacheLimit = 4
  let cacheRange = _.range(cacheLimit + 1)

  let multiCache = _.reduce(cacheRange, (acc, i) => {
    if (i > 0) {
      //acc[i] = makeMorphIterN(i)
      acc[i] = makeMorph.makeOpIterN(i, operator)
    }
    return acc
  }, Object())

  let singleCache = _.reduce(cacheRange, (acc, i) => {
    //acc[i] = makeMorphIterN.single(i)
    if (i > 0) {
      acc[i] = makeMorph.makeOpSingleN(i, operator)
    }
    return acc
  }, Object())

  singleCache[0] = (iterable, offset, acc) => {
    return acc
  }

  return (iterable, acc) => {
    let length = iterable.length

    let mod = length % cacheLimit
    if (length >= cacheLimit) {
      acc = multiCache[cacheLimit](iterable, 0, length - mod, acc)
    }

    return singleCache[mod](iterable, length - mod, acc)
  }
}

exports.makeMorphReduce = () => {
  let cacheLimit = 32
  let cacheRange = _.range(cacheLimit + 1)

  let multiCache = _.reduce(cacheRange, (acc, i) => {
    if (i > 0) {
      acc[i] = makeMorph.makeMorphIterN(i)
    }
    return acc
  }, Object())

  let singleCache = _.reduce(cacheRange, (acc, i) => {
    if (i > 0) {
      acc[i] = makeMorph.makeMorphSingleN(i)
    }
    return acc
  }, Object())

  singleCache[0] = (iterable, reduction, offset, acc) => {
    return acc
  }

  return (iterable, reduction, acc) => {
    let length = iterable.length

    let mod = length % cacheLimit
    if (length >= cacheLimit) {
      acc = multiCache[cacheLimit](iterable, 0, length - mod, reduction, acc)
    }

    let res = singleCache[mod](iterable, reduction, length - mod, acc)
    return res
  }
}

//let cacheLimit = 4
//let cacheRange = _.range(cacheLimit + 1)
//
//let multiCache = _.reduce(cacheRange, (acc, i) => {
//  if (i > 0) {
//    acc[i] = makeMorphIterN(i)
//  }
//  return acc
//}, Object())
//
//let singleCache = _.reduce(cacheRange, (acc, i) => {
//  acc[i] = makeMorphIterN.single(i)
//  return acc
//}, Object())
//
//singleCache[0] = (iterable, reduction, offset, acc) => {
//  return reduction(acc, iterable[0])
//}
//
//module.exports = (iterable, reduction, acc) => {
//  let length = iterable.length
//
//  let mod = length % cacheLimit
//  if (length >= cacheLimit) {
//    acc = multiCache[cacheLimit](iterable, 0, length - mod, reduction, acc)
//  }
//
//  return singleCache[mod](iterable, reduction, length - mod, acc)
//}


