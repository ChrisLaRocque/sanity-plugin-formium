import {defineField} from 'sanity'
import {PluginConfig} from '../types'
import FormList from '../components/FormList'

export default (config: PluginConfig) => {
  return defineField({
    name: 'formiumSelect',
    type: 'string',
    options: {
      list: [],
    },
    components: {
      input: (props) => FormList(props, config),
    },
  })
}
