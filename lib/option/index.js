'use strict'

let Util = require('util')

function Option() { }

function None() {
  this.get = () => {
    throw new Error('Can\'t call get() from None type.')
  }
}

function Some(val) {
  this.get = () => val
}

Util.inherits(Some, Option)
Util.inherits(None, Option)

let baseNone = new None()

let none = () =>
  baseNone

let some = val =>
  new Some(val)

let option = val =>
  (val === undefined) ?
    baseNone : some(val)

Some.prototype.identity = this
None.prototype.identity = baseNone

Some.prototype.isSome = () =>
  true

None.prototype.isSome = () =>
  false


Some.prototype.count = () =>
  1

None.prototype.count = () =>
  0

Some.prototype.fold = function(folder) {
  let self = this

  return state =>
    folder(state)(this.get())
}

None.prototype.fold = folder => state =>
  state


Some.prototype.map = function(mapping) {
  return some(mapping(this.get()))
}

None.prototype.map = mapping =>
  baseNone


Some.prototype.toArray = function() {
  return [ this.get() ]
}

None.prototype.toArray = () =>
  [ ]


module.exports = option
module.exports.some = some
module.exports.none = baseNone
