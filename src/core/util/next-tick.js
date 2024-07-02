import { noop } from 'shared/util'
import { isNative, isIOS } from './env'

let timerFunc

const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
} else {
  console.log('todo.............')
}

export function nextTick (cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.log(e)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    console.log('todo.............')
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
