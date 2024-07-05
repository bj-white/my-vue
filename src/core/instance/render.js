import { installRenderHelpers } from './render-helper/index'
import { nextTick } from '../util/index'
import { createElement } from '../vdom/create-element'

export let currentRenderingInstance = null

export function renderMixin (Vue) {
  installRenderHelpers(Vue.prototype)
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  }
  Vue.prototype._render = function () {
    const vm = this
    const { render, _parentVnode } = vm.$options
    
    if (_parentVnode) {
      console.log('todo.........')
    }

    vm.$vnode = _parentVnode
    let vnode
    try {
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      console.log('todo.............')
    } finally {
      currentRenderingInstance = null
    }
    return vnode
  }
}

export function initRender (vm) {
  vm._vnode = null
  vm._staticTrees = null
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode
  const renderContext = parentVnode && parentVnode.context
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}
