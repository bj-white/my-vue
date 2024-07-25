import Module from './Module'
import startWebApp from './startWebApp'
import applet from './assets/applet.json'

export default class BaseWebPage {
  async start () {
    const { appConfig } = await this.init()
    const module = await this.getModule(appConfig)
    startWebApp({
      module
    })
  }

  async init () {
    return { appConfig: applet }
  }

  async getModule (appConfig) {
    return this.createModule(appConfig)
  }

  createModule (appletConfig) {
    const { config } = appletConfig.spec
    return new Module({ config })
  }
}
