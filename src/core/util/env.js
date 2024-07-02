export const hasProto = '__proto__' in {}

export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')

export const nativeWatch = ({}).watch

let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

export function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
