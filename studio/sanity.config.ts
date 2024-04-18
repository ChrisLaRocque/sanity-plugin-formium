import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myPlugin} from 'sanity-plugin-formium'

const token = import.meta.env.SANITY_STUDIO_FORMIUM_TOKEN
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
export default defineConfig({
  name: 'default',
  title: 'Test studio',

  projectId: projectId,
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    myPlugin({
      projectId: '66206d8a1e412300017dd2db',
      token,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
