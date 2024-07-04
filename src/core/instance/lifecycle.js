import { pushTarget, popTarget } from '../observer/dep'
import { invokeWithErrorHandling } from '../util/index'
import { createEmptyVNode } from '../vdom/vnode'
import { noop } from '../util/index'
import Watcher from '../observer/watcher'

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function () {
    console.log('_update')
  }
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
}

export function mountComponent (vm, el, hydrating) {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  callHook(vm, 'beforeMount')

  let updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true)

  hydrating = false

  return vm
}

export function initLifecycle (vm) {
  const options = vm.$options
  let parent = options.parent
  if (parent && !options.abstract) {
    console.log('todo............')
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function callHook (vm, hook) {
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers)  {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  popTarget()
}
