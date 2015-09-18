'use strict'

let _ = require('lodash')
let sprintf = require('util').format

let makeMapN = len => {
  let doMap = _.map(_.range(len), index => {
    return sprintf('acc[i+%s] = mapping(iterable[i + %s])', index, index)
  })

  let acc = [
    '(iterable, mapping, offset, limit, acc) => {',
      'var i = offset, length = offset + limit',
      'while (i < length) {',
        doMap.join('\n'),
        sprintf('i += %s', len),
      '}',
      'return acc',
    '}'
  ].join('\n')

  return eval(acc)
}

let makeMap = len => {
  let doMap = _.map(_.range(len), i => {
    return sprintf('acc[%s + offset] = mapping(iterable[%s + offset])', i, i)
  })

  let acc = [
    '(iterable, mapping, offset, acc) => { ',
      doMap.join('\n'),
      'return acc',
    '}'
  ].join('\n')

  return eval(acc)
}

let map = (iterable, mapping, offset, limit, acc) => {
  var i = offset

  while(++i < limit) {
    acc[i] = mapping(iterable[i])
  }

  return acc
}

exports.baseMap = () => {
  let cacheLimit = 10
  let cacheRange = _.range(cacheLimit + 1)

  let multiCache = { }
  let singleCache = { }

  _.each(cacheRange, i => {
    if (i > 0) {
      multiCache[i] = makeMapN(i)
      singleCache[i] = makeMap(i)
    }
  })

  singleCache[0] = (iterable, mapping, offset, acc) => {
    return acc
  }

  return (iterable, mapping, acc) => {
    let length = iterable.length

    let mod = length % cacheLimit
    if (length >= cacheLimit) {
      acc = multiCache[cacheLimit](iterable, mapping, 0, length - mod, acc)
    }

    return map(iterable, mapping, length - mod, length, acc)

    //return singleCache[mod](iterable, mapping, length - mod, acc)
    //return res
  }
}
