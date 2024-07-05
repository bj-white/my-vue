import { isPrimitive, isTrue, isDef } from '../util/index'
import { normalizeChildren } from './helpers/index'

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
  }
}
