import { nextTick, inBrowser, isIE } from '../util/index'

let has = {}
let flushing = false
const queue = []
let waiting = false
let index = 0
const activatedChildren = []

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

function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0
  has = {}
  waiting = flushing = false
}

function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id
  queue.sort((a, b) => a.id - b.id)
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run()
  }

  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)
}

function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher && watcher && vm._isMounted && !vm._isDestroyed) {
      console.log('todo...............')
    }
  }
}

function callActivatedHooks (queue) {
  for (let i = 0; i < queue.length; i++) {
    console.log('todo....................')
  }
}

export function queueWatcher (watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      console.log('todo..........')
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
