import { initMinix } from './init'
import { stateMixin } from './state'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'

function Vue (options) {
  this._init(options)
}

initMinix(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
