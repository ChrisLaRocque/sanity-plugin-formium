import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {formiumSelect} from 'sanity-plugin-formium'

// const token = import.meta.env.SANITY_STUDIO_FORMIUM_TOKEN
// const formiumID = import.meta.env.SANITY_STUDIO_FORMIUM_ID
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID

export default defineConfig({
  name: 'default',
  title: 'Test studio',

  projectId: projectId,
  dataset: 'production',

  plugins: [structureTool(), visionTool(), formiumSelect()],

  schema: {
    types: schemaTypes,
  },
})
