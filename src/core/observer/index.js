import VNode from '../vdom/vnode'
import { isObject, hasOwn } from '../util/index'

export function set (target, key, val) {}

export function del (target, key) {}

export function defineReactive () {}

export class Observer {}

export function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
