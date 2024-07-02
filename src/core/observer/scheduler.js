import { nextTick, inBrowser, isIE } from '../util/index'

let has = {}
let flushing = false
const queue = []
let waiting = false

export let currentFlushTimestamp = 0

let getNow = Date.now

if (inBrowser && !isIE) {
  const performance = window.performance
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    getNow = () => performance.now()
  }
}

function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
}

export function queueWatcher (watcher) {
  console.log(watcher)
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push()
    } else {
      console.log('todo..........')
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
