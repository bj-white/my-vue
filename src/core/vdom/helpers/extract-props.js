import { isUndef } from 'core/util/index'

export function extractPropsFromVNodeData (data, Ctor, tag) {
  const propOptions = Ctor.options.props
  if (isUndef(propOptions)) {
    return
  }
  console.log('todo.....................')
}
