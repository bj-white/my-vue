export function createElement (tagName, vnode) {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  console.log('todo................')
}

export function tagName (node) {
  return node.tagName
}

export function parentNode (node) {
  return node.parentNode
}

export function nextSibling (node) {
  return node.nextSibling
}

export function createElementNS (namespace, tagName) {
  console.log('todo.........................')
}

export function createTextNode (text) {
  return document.createTextNode(text)
}

export function insertBefore (parentNode, newNode, reference) {
  parentNode.insertBefore(newNode, reference)
}

export function appendChild (node, child) {
  node.appendChild(child)
}

export function removeChild (node, child) {
  node.removeChild(child)
}
