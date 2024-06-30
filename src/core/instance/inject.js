export function initInjections (vm) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    console.log('todo..........')
  }
}

export function resolveInject (inject, vm) {
  if (inject) {
    console.log('todo............')
  }
}

export function initProvide (vm) {
  const provide = vm.$options.provide
  if (provide) {
    console.log('todo............')
  }
}
