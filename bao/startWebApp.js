import LocalApp  from './local-app'
import store from './store'

export default ({ module }) => {

  return {
    app: new LocalApp({
      store: store(module),
      module
    })
  }
}