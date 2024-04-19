import {definePlugin} from 'sanity'
import formList from './schema/form-list'

export const formiumSelect = definePlugin(() => {
  return {
    name: 'sanity-plugin-formium',
    schema: {
      types: [formList],
    },
  }
})
