import { isPrimitive } from 'shared/util'
import { createTextVNode } from 'core/vdom/vnode'

export function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

export function normalizeArrayChildren (children) {
  console.log('todo................')
}
