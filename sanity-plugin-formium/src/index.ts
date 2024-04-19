import {definePlugin, defineType, defineField} from 'sanity'
import {PluginConfig} from './types'
import formList from './schema/form-list'
// import {createClient} from '@formium/client'
// import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

export const formiumSelect = definePlugin<PluginConfig>((config) => {
  return {
    name: 'sanity-plugin-formium',
    schema: {
      types: [formList(config)],
    },
  }
})
