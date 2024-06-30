import { installRenderHelpers } from './render-helper/index'

export function renderMixin (Vue) {
  installRenderHelpers(Vue.prototype)
  Vue.prototype.$nextTick = function () {}
  Vue.prototype._render = function () {}
}

export function initRender (vm) {
  vm._vnode = null
  vm._staticTrees = null
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode
}
