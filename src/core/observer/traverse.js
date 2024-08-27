import { isObject } from '../util/index'
import VNode from '../vdom/vnode'

const seenObjects = new Set()

export function traverse (val) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}

function _traverse (val, seen) {
  let i, keys
  const isA = Array.isArray(val)
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    console.log('todo...........')
    return
  }
  if (val.__ob__) {
    console.log('todo..................')
  }
  if (isA) {
    console.log('todo...............')
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen)
  }
}
