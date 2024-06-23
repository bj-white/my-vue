import { hasOwn } from 'shared/util'

export function mergeOptions (parent, child, vm) {
  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  if (!child._base) {
    if (child.extends) {
      console.log('todo.............')
    }
    if (child.mixins) {
      console.log('todo.............')
    }
  }

  const options = {}
  let key
  for (key in parent) {
    console.log('todo.............')
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    console.log(key)
  }
  return options
}

function normalizeProps (options, vm) {
  const props = options.props
  if (props) {
    console.log('todo.............')
  }
}

function normalizeInject (options, vm) {
  const inject = options.inject
  if (inject) {
    console.log('todo.............')
  }
}

function normalizeDirectives (options) {
  const dirs = options.directives
  if (dirs) {
    console.log('todo.............')
  }
}
