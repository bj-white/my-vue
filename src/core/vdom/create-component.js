import { isDef, isUndef, isObject, isTrue } from '../util/index'
import { resolveConstructorOptions } from 'core/instance/init'
import { extractPropsFromVNodeData } from './helpers/index'
import VNode from './vnode'
import { activeInstance } from '../instance/lifecycle'

const componentVNodeHooks = {
  init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      console.log('todo..............')
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance)
    }
  },
  prepatch () {
    console.log('todo..............')
  },
  insert () {
    console.log('todo..............')
  },
  destroy () {
    console.log('todo..............')
  }
}

const hooksToMerge = Object.keys(componentVNodeHooks)

export function createComponentInstanceForVnode (vnode, parent) {
  const options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    console.log('todo...........')
  }
  return new vnode.componentOptions.Ctor(options)
}

export function createComponent (Ctor, data, context, children, tag) {
  const baseCtor = context.$options._base
  if (isObject(Ctor)) {
    console.log('todo..............')
  }
  if (typeof Ctor !== 'function') {
    return
  }
  let asyncFactory
  if (isUndef(Ctor.cid)) {
    console.log('todo.................')
  }
  data = data || {}
  resolveConstructorOptions(Ctor)

  if (isDef(data.model)) {
    console.log('todo...................')
  }

  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  if (isTrue(Ctor.options.functional)) {
    console.log('todo................')
  }

  const listeners = data.on
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    console.log('todo..............')
  }

  installComponentHooks(data)

  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data,
    undefined, // children
    undefined, // text
    undefined, // el
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode
}

function installComponentHooks (data) {
  const hooks = data.hook || (data.hook = {})
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const existing = hooks[key]
    const toMerge = componentVNodeHooks[key]
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
    }
  }
}

function mergeHook () {
  console.log('todo.................')
}
