import { set, del } from '../observer/index'
import Watcher from '../observer/watcher'

export function stateMixin (Vue) {
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del
}

export function initState (vm) {
  const opts = vm.$options
  if (opts.computed) initComputed(vm, opts.computed)
}

function initComputed (vm, computed) {
  const watchers = vm._computedWatchers = Object.create(null)
  for (const key in computed) {
    watchers[key] = new Watcher(vm)
  }
}
