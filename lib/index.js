'use strict'

let Array = require('./array')
let Object = require('./object')
let _ = require('lodash')

exports.map = mapping => obj => {
  if (_.isArray(obj)) {
    return Array.map(mapping)(obj)
  }
  else if (_.isObject(obj)) {
    return Object.map(mapping)(obj)
  }
}

exports.option = require('./option')
