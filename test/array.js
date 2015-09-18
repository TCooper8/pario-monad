'use strict'

let Assert = require('assert')
//let baseMorphN = require('../lib/baseMorphN.js')
let Array = require('../lib/array')
let Monad = require('../lib')
let _ = require('lodash')

let sumArray = new Int32Array(_.range(1 << 17))

let timed = iters => f => () => {
  let ti = new Date()
  _.times(iters - 1, f)
  let tf = new Date()
  let dt = (tf - ti) / 1000.0
  console.log('%s seconds', dt)

  return f(iters-1)
}

describe('Testing sum function', () => {
  it('should sum the array', () => {
    Assert.equal(Array.sum(sumArray), _.sum(sumArray))

    let ti = new Date()
    _.times(10, () => {
      let acc = Array.sum(sumArray)
      //let acc = _.sum(sumArray)
    })
    let tf = new Date()
    let dt = (tf - ti) / 1000.0
    console.log('Time = %s', dt)
  })
})

let everyArray = _.range(1 << 17)
everyArray[0] = true

describe('Testing every function', () => {
  it('should compare true to lodash', () => {
    Assert.equal(Array.every(everyArray), _.every(everyArray))

    _.times(10, () => {
      //_.every(everyArray, Boolean)
      Array.every(everyArray, Boolean)
    })
  })
})

describe('Testing append function', () => {
  it('should append two arrays', () => {
    Assert.deepEqual(
      Array.append([1,2,3])([4,5,6]),
      [1,2,3,4,5,6]
    )
  })
})

describe('Testing averageBy function', () => {
  it('should average the array', () => {
    let array = _.range(10000)
    let projection = i => i * 2

    Assert.equal(
      timed(1)( i => Array.averageBy(projection)(array) )(),
      timed(1)( i => _.sum(_.map(array, projection)) )()
    )
  })
})

//describe('Testing choose function', () => {
//  it('should choose even numbers', () => {
//    let array = _.range(100000)
//    let chooser = i => (i % 2 === 0) ? i : undefined
//
//    let f = Array.choose(chooser)
//
//    Assert.deepEqual(
//      timed(500)( i => f(array) )(),
//      timed(1)( i => [0].concat(_.filter(array, chooser)) )()
//    )
//  })
//})

describe('Testing map function', () => {
  it('should map correctly', () => {
    let array = _.range(100000)
    array = _.zipObject(array, array)
    let mapping = i => i * 2

    Assert.deepEqual(
      timed(1)( i => Monad.map(mapping)(array) )(),
      timed(50)( i => _.map(array, mapping) )()
    )
  })
})
