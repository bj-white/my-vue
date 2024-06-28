let uid = 0
export default class Watcher {
  constructor (vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm
    this.deep = this.user = this.lazy = this.sync = false
    this.cb = cb
    this.id = uid++
  }

  addDep (dep) {
    dep.addSub(this)
  }

  update () {
    this.cb.call(this.vm, value, oldValue)
  }
}