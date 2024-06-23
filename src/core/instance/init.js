import { mergeOptions } from '../util/index'

let uid = 0

export function initMinix (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm._uid = uid++
    vm._isVue = true
    if (options && options._isComponent) {
      console.log('todo.............')
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
  }
}

export function resolveConstructorOptions (Ctor) {
  const options = Ctor.options
  if (Ctor.super) {
    console.log('todo.............')
  }
  return options
}
