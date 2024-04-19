import {defineField} from 'sanity'
import {PluginConfig} from '../types'
import Input from '../components/Input'

export default (config: PluginConfig) => {
  return defineField({
    name: 'formiumSelect',
    type: 'string',
    // Blank options object so we don't get 'undefined' in the component
    options: {},
    components: {
      input: (props) => Input(props),
    },
  })
}
