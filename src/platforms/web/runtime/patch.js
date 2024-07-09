import { createPatchFunction } from 'core/vdom/patch'
import * as nodeOps from 'web/runtime/node-ops'
import platformModules from 'web/runtime/modules/index'
import baseModules from 'core/vdom/modules/index'

const modules = platformModules.concat(baseModules)

export const patch = createPatchFunction({ nodeOps, modules })
