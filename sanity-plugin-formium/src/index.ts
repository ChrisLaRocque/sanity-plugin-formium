import {definePlugin, defineType, defineField} from 'sanity'
import {PluginConfig} from './types'
import formList from './schema/form-list'
// import {createClient} from '@formium/client'
// import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

export const myPlugin = definePlugin<PluginConfig | void>((config) => {
  // const {projectId, token} = config
  // const formium = createClient(projectId, {
  //   apiToken: token,
  // })
  // const forms = await formium.findForms()

  // console.log('forms', forms)
  return {
    name: 'sanity-plugin-formium',
    schema: {
      types: [formList(config)],
    },
  }
})
