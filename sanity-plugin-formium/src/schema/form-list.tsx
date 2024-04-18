import {defineField} from 'sanity'
import {PluginConfig} from '../types'
import FormList from '../components/FormList'

export default (config: PluginConfig) => {
  return defineField({
    name: 'formiumSelect',
    type: 'object',
    fields: [
      {
        name: 'form',
        type: 'string',
        options: {
          list: ['what'],
        },
      },
    ],

    components: {
      input: (props) => FormList(props, config),
    },
  })
}
