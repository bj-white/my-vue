import Vue from 'vue'
import App from './App.vue'

export default class LocalApp {
  constructor (options) {
    const { store, module } = options
    this.store = store
    this.instance = null
    this.render(module.context)
  }

  render (context) {
    this.instance = new Vue({
      store: this.store,
      render: h => h(App, { props: { context }})
    }).$mount('#app')
  }
}