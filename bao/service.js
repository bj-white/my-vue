import schema from './assets/schema.json'
import DocumentSchemaBulider from './schema-builder'

class DocService {
  constructor () {}
  async init () {
    this.schema = DocumentSchemaBulider.of(schema)
  }
}

DocService.newService = async function (def) {
  const service = new DocService(def)
  await service.init()
  return service
}

export default DocService
