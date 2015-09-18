'use strict'

let _ = require('lodash')
let sprintf = require('util').format

let makeMorphIterN = len => {
  let args = _.map(_.range(len), i => 'a' + i)

  let setArgs = _.map(args, arg => {
    let index = parseInt(arg.slice(1))
    return sprintf('%s = iterable[i + %s]', arg, index)
  })

  let setAcc = _.map(args, arg => {
    return sprintf('acc = reduction(acc, %s)', arg)
  })

  let acc = [
    '(iterable, offset, limit, reduction, acc) => {',
      'var i = offset, length = offset + limit',
      sprintf('var %s', args.join(', ')),
      'while (i < length) {',
        setArgs.join('\n'),
        setAcc.join('\n'),
        //sprintf('acc = morphN(%s)', args.join(', ')),
        sprintf('i += %s', len),
      '}',
      'return acc',
    '}'
  ].join('\n')

  return eval(acc)
}

let makeOpIterN = (len, operator) => {
  let args = _.map(_.range(len), i => 'a' + i)

  let setArgs = _.map(args, arg => {
    let index = parseInt(arg.slice(1))
    return sprintf('%s = iterable[i + %s]', arg, index)
  })

  let acc = [
    '(iterable, offset, limit, acc) => {',
      'var i = offset, length = offset + limit',
      sprintf('var %s', args.join(', ')),
      'while (i < length) {',
        setArgs.join('\n'),
        sprintf('acc = acc %s %s', operator, args.join(' ' + operator + ' ')),
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
    return sprintf('var %s = iterable[offset + %s]', arg, index)
  })

  let setAcc = _.map(args, arg => {
    return sprintf('acc = reduction(acc, %s)', arg)
  })

  let res = [
    '(iterable, reduction, offset, acc) => {',
      setArgs.join('\n'),
      setAcc.join('\n'),
      'return acc',
      //sprintf('return %s', args.join(' + ')),
    '}'
  ].join('\n')

  return eval(res)
}

let makeOpSingleN = (len, operator) => {
  let args = _.map(_.range(len), i => 'a' + i)

  let setArgs = _.map(args, arg => {
    let index = parseInt(arg.slice(1))
    return sprintf('var %s = iterable[offset + %s]', arg, index)
  })

  let res = [
    '(iterable, offset, acc) => {',
      setArgs.join('\n'),
      sprintf('return acc %s %s', operator, args.join(' ' + operator + ' ')),
    '}'
  ].join('\n')

  return eval(res)
}

exports.makeMorphIterN = makeMorphIterN
exports.makeMorphSingleN = makeMorphSingleN

exports.makeOpIterN = makeOpIterN
exports.makeOpSingleN = makeOpSingleN
