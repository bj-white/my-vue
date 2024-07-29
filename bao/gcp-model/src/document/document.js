import Vue from 'vue'
const { initComputed } = Vue.util

export default class Document {
  constructor (docType, propValues = {}, context = {}, options = {}) {
    this.defineProperties(docType)
    this.setValues(propValues)
  }

  defineProperties (docType) {
    this.$options = {
      readonly: true
    }
    this.$origin = {}
    Object.defineProperty(this, '__computedVM', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: {
        _doc: this,
        _watchers: []
      }
    })
    Object.defineProperties(this, docType.propertyDescs)
  }

  setValues (propValues) {
    for (const name in propValues) {
      this.setValue(name, propValues[name])
    }
    this.setExprComputed()
  }

  setExprComputed () {
    const exprComputed = {}
    for (const key in this.docType.propertyDefs) {
      const propertyDef = this.docType.propertyDefs[key]
      const {
        propDesc: { expr },
        computedGetter
      } = propertyDef
      if (expr != null) {
        exprComputed[key] = computedGetter.bind(propertyDef)
      }
    }
    if (Object.keys(exprComputed).length) {
      initComputed(this.__computedVM, exprComputed)
    }
  }

  setValue (prop, value) {
    Vue.set(this, prop, value)
  }
}
