export function eventsMixin (Vue) {
  Vue.prototype.$on = function () {}
  Vue.prototype.$once = function () {}
  Vue.prototype.$off = function () {}
  Vue.prototype.$emit = function () {}
}
