import { isNative } from '../util/index'

let initProxy

if (process.env.NODE_ENV !== 'production') {
  const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy)

  if (hasProxy) {
    
  }
}

export { initProxy }
