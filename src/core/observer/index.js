import Dep from './dep'
import VNode from '../vdom/vnode'
import { isObject, hasOwn, isServerRendering, isPlainObject, def } from '../util/index'

export function set (target, key, val) {}

export function del (target, key) {}

export function defineReactive (obj, key, val, customSetter, shallow) {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return value
    },
    set: function (newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value) {
        return
      }
      val = newVal
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

export class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {} else {
      this.walk(value)
    }
  }

  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

export let shouldObserve = true

export function toggleObserving (value) {
  shouldObserve = value
}

export function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
