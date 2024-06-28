import config from '../config'
import { extend, mergeOptions, defineReactive } from '../util/index'
import { set, del } from '../observer/index'
import { nextTick } from '../util/index'
import { observe } from 'core/observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import Watcher from '../observer/watcher'

export function initGlobalAPI (Vue) {
  const configDef = {}
  configDef.get = () => config
  Object.defineProperty(Vue, 'config', configDef)

  Vue.util = {
    extend,
    mergeOptions,
    defineReactive,
    Watcher
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.observable = obj => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
