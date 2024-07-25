import Vuex from 'vuex'

export default class Module {
  constructor ({ config }) {
    this.initialize(config)
    this.store = this.createStore()
    this.context = this.createContext()
  }

  initialize (config) {
    this.config = config
    console.log(this.config)
    this.state = {}
    this.actions = [
      'bootstrap'
    ]
  }

  createStore () {
    const store = new Vuex.Store({
      state: this.state,
      actions: this.bindMethods(this.actions)
    })
    return store
  }

  bindMethods (names) {
    const result = {}
    names.forEach(name => {
      result[name] = this[name].bind(this)
    })
    return result
  }

  createContext () {
    return {}
  }

  async bootstrap () {
    const requestPromisesAllSettled = []
    requestPromisesAllSettled.push(this.initServices())
  }

  async initServices () {

  }
}
