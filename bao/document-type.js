import PropertyBuilder from './properties'

export default class DocumentType {
  constructor (name, properties) {
    this.kind = 'doc'
    this.name = name
    this.properties = properties
    const builder = PropertyBuilder.of(this)
  }
}