import { isDef } from 'shared/util'

export default {
  create () {},
  update () {},
  destroy (vnode) {
    registerRef(vnode, true)
  }
}

export function registerRef (vnode, isRemoval) {
  const key = vnode.data.ref
  if (!isDef(key)) return
  console.log('todo..................')
}
