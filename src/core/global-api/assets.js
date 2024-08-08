import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject } from '../util/index'

export function initAssetRegisters (Vue) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (id, definition) {
      if (!definition) {
        console.log('todo.................')
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
