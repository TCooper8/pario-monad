'use strict'

let _ = require('lodash')
let sprintf = require('util').format

let makeMorphIterN = len => {
  let args = _.map(_.range(len), i => 'a' + i)

  let setArgs = _.map(args, arg => {
    let index = parseInt(arg.slice(1))
    return sprintf('%s = predicate(iterable[i + %s])', arg, index)
  })

  let acc = [
    '(iterable, offset, limit, predicate) => {',
      'var i = offset, length = offset + limit, acc = true',
      sprintf('var %s', args.join(', ')),
      'while (i < length) {',
        setArgs.join('\n'),
        sprintf('acc = acc && %s', args.join(' && ')),
        'if (acc === false) return acc',
        sprintf('i += %s', len),
      '}',
      'return acc',
    '}'
  ].join('\n')

  return eval(acc)
}

let makeMorphSingleN = len => {
  let args = _.map(_.range(len), i => 'a' + i)

  let setArgs = _.map(args, arg => {
    let index = parseInt(arg.slice(1))
    return sprintf('var %s = predicate(iterable[offset + %s])', arg, index)
  })

  let res = [
    '(iterable, offset, predicate, acc) => {',
      setArgs.join('\n'),
      sprintf('return acc && %s', args.join(' && ')),
    '}'
  ].join('\n')

  return eval(res)
}

module.exports = makeMorphIterN
module.exports.single = makeMorphSingleN
