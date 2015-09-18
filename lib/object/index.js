'use strict'

let baseReduce = require('../baseMorphN.js').makeMorphReduce()
let _ = require('lodash')

exports.map = mapping => obj => {
  let keys = Object.keys(obj)
  let indices = _.range(keys.length)

  let reduction = (acc, i) => {
    var key = keys[i]
    acc[key] = mapping(obj[key])
    return acc
  }

  return baseReduce(indices, reduction, { })
}
