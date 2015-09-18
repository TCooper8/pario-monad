'use strict'

//let baseSum = require('./baseMorphN.js')
let makeMorphs = require('../baseMorphN.js')

let baseSum = require('./sum')
let baseEvery = require('./every')
let baseReduce = require('../baseMorphN.js').makeMorphReduce()
let baseMap = require('../baseMapN.js').baseMap()

exports.append = array0 => array1 => {
  var l0 = array0.length
  var l1 = array1.length
  var length = l0 + l1
  var acc = array0.slice(0)
  var i = l0, j = -1

  while(++j < l1) {
    acc[i] = array1[j]
    ++i
  }

  return acc
}

exports.average = array => {
  let length = array.length
  return baseSum(array, 0) / length
}

exports.averageBy = projection => array => {
  let reduction = (acc, e) => {
    return acc + projection(e)
  }
  return baseReduce(array, reduction, 0)
}


exports.choose = chooser => {
  var reduction = (acc, e) => {
    var val = chooser(e)
    if (val !== undefined) {
      acc.arr[++acc.i] = val
    }
    return acc
  }

  return array => {
    var acc = {
      arr: new Array(array.length / 2),
      i: -1
    }

    baseReduce(
      array,
      reduction,
      acc
    )
    return acc.arr
  }
}

exports.every = (array, predicate) => {
  if (!predicate) predicate = Boolean
  return baseEvery(array, predicate )
}

exports.map = mapping => array => {
  return baseMap(array, mapping, new Array(array.length))
}

exports.sum = array =>
  baseSum(array, 0)

