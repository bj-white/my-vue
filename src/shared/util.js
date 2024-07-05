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

export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

function polyfillBind (fn, ctx) {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind

const camelizeRE = /-(\w)/g
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

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

export function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

export function isTrue (v) {
  return v === true
}

export function isDef (v) {
  return v !== undefined && v !== null
}
