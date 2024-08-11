import { mergeOptions } from'../util/index'
import { ASSET_TYPES } from 'shared/constants'

export function initExtend (Vue) {
  Vue.cid = 0
  let cid = 1
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const name = extendOptions.name || Super.options.name
    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(Super.options, extendOptions)
    Sub['super'] = Super
    if (Sub.options.props) {
      console.log('todo..............')
    }
    if (Sub.options.computed) {
      console.log('todo..................')
    }
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    if (name) {
      Sub.options.components[name] = Sub
    }

    Sub.superOptions = Super.options
    return Sub
  }
}