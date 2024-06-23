import { no, noop } from 'shared/util'

export default ({
  optionMergeStrategies: Object.create(null),
  silent: false,
  mustUseProp: no,
  isReservedTag: no,
  isReservedAttr: no,
  getTagNamespace: noop
})