import { isUndef, isDef, isTrue, isPrimitive } from '../util/index'
import { SSR_ATTR } from 'shared/constants'
import VNode from './vnode'
import { activeInstance } from '../instance/lifecycle'

const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export const emptyNode = new VNode('', {}, [])

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}

  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function setScope (vnode) {
    let i
    if (isDef(i = vnode.fnScopeId)) {
      console.log('todo............')
    } else {
      let ancestor = vnode
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          console.log('todo...............')
        }
        ancestor = vnode.parent
      }
    }
    if (
      isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      console.log('todo...............')
    }
  }

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm && isDef(ownerArray))) {
      console.log('todo................')
    }
    vnode.isRootInsert = !nested
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode)

      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        console.log('todo............')
      }
      insert(parentElm, vnode.elm, refElm)
    } else if (isTrue(vnode.isComment)) {
      console.log('todo....................')
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
      }
    } else if (isPrimitive(vnode.text)) {
      console.log('todo..................')
    }
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
          nodeOps.insertBefore(parent, elm, ref)
        }
      } else {
        nodeOps.appendChild(parent, elm)
      }
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false)
      }
      if (isDef(vnode.componentInstance)) {
        debugger
      }
    }
  }

  function invokeDestroyHook (vnode) {
    let i, j
    const data = vnode.data
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        console.log('todo...............')
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode)
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        console.log('todo.................')
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch)
          invokeDestroyHook(ch)
        } else {
          console.log('todo..............')
        }
      }
    }
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm)
      }
    }
    remove.listeners = listeners
    return remove
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      let i
      const listeners = cbs.remove.length + 1
      if (isDef(rm)) {
        console.log('todo..............')
      } else {
        rm = createRmCb(vnode.elm, listeners)
      }
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        console.log('todo.......................')
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        console.log('todo..............')
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        console.log('todo...............')
      } else {
        rm()
      }
    } else {
      removeNode(vnode.elm)
    }
  }

  function removeNode (el) {
    const parent = nodeOps.parentNode(el)
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      console.log('todo......................')
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      console.log('todo..............')
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        console.log('todo...........')
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            console.log('todo..............')
          }
          if (isTrue(hydrating)) {
            console.log('todo..................')
          }
          oldVnode = emptyNodeAt(oldVnode)
        }

        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
        
        if (isDef(vnode.parent)) {
          console.log('todo...............')
        }

        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          console.log('todo...............')
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }

  function invokeInsertHook (vnode, queue, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      console.log('todo....................')
    } else {
      for (let i = 0; i < queue.length; ++i) {
        console.log('todo................')
      }
    }
  }
}
