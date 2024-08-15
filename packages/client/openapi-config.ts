import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:8080/swagger.json',
  apiFile: './src/config/store/api/index.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/config/store/api/petApi.ts',
  exportName: 'petApi',
  hooks: true,
}

export default config