export function eventsMixin (Vue) {
  Vue.prototype.$on = function () {}
  Vue.prototype.$once = function () {}
  Vue.prototype.$off = function () {}
  Vue.prototype.$emit = function () {}
}

export function initEvents (vm) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  const listeners = vm.$options._parentListeners
  if (listeners) {
    console.log('todo...............')
  }
}
