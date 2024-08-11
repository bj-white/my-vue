import { isPrimitive, isTrue, isDef, resloveAsset } from '../util/index'
import { normalizeChildren } from './helpers/index'
import config from '../config'
import VNode from './vnode'
import { createComponent } from './create-component'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement (context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    console.log('todo..............')
  }
  if (isDef(data) && isDef(data.is)) {
    console.log('todo..............')
  }
  if (!tag) {
    console.log('todo..............')
  }
  if (Array.isArray(children) && typeof children[0] === 'function') {
    console.log('todo..............')
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    console.log('todo.............')
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resloveAsset(context.$options, 'components', tag))) {
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      console.log('todo...............')
    }
  } else {
    console.log('todo..................')
  }
  if (Array.isArray(vnode)) {
    console.log('todo..........')
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    console.log('todo................')
  }
}

function applyNS (vnode, ns, force) {
  console.log('todo................')
}

function registerDeepBindings (data) {
  console.log('todo................')
}
