const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toNumber () {}

export function toString () {}

export function looseEqual () {}

export function looseIndexOf () {}

export const no = () => false

const _toString = Object.prototype.toString

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export function noop () {}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
