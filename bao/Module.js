import Vuex from 'vuex'
import DocService from './service'

export default class Module {
  constructor ({ config }) {
    this.initialize(config)
    this.store = this.createStore()
    this.context = this.createContext()
    console.log('module=========================', this)
  }

  initialize (config) {
    this.config = config
    this.state = {}
    this.actions = [
      'bootstrap'
    ]
    this.services = new Map()
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
    await Promise.allSettled(requestPromisesAllSettled)
  }

  async initServices () {
    const serviceDefs = Object.entries(this.config.serviceDefs)
    for (const [key, def] of serviceDefs) {
      const service = await this.createDocService(def, key)
      this.services.set(key, service)
    }
  }

  async createDocService (serviceDef, key) {
    return await DocService.newService(serviceDef)
  }
}
