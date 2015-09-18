'use strict'

/*

  (acc, e) =>
    acc + e

*/

function Strtok(str, sep) {
  this.sep = sep || /\s|\n/g
  let tokens = str.split(this.sep)

  let tokIndex = -1
  let strIndex = -1
  let length = tokens.length
  let tokCur

  this.next = () => {
    ++tokIndex
    tokCur = tokens[tokIndex]
    strIndex = -1
    return tokCur
  }

  this.peekChar = () => {
    if (!tokCur) {
      return tokens[0][0]
    }

    if (strIndex + 1 >= tokCur.length)
      return tokens[tokIndex + 1][0]
    return tokCur[strIndex + 1]
  }
}

function Parser(strDesc) {
  let paramReg = /\(.*\)/

  let parse = {
    init: () => {
      let params = paramReg.exec(strDesc)[0]
      if (!params) {
        throw new Error('Expected parameter list')
      }

      params = params.replace(/\(|\)/g, '').split(',')
      return parse.params(params)
    },
    params: params => {

    }
  }

  parse.init()
}

let makeReduction = strDesc => {
  return new Parser(strDesc)
}

makeReduction('(acc, e) => acc + e')
