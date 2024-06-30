import { pushTarget, popTarget } from '../observer/dep'
import { invokeWithErrorHandling } from '../util/index'

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function () {}
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
}

export function mountComponent () {}

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
