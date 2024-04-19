import {defineField} from 'sanity'
import Input from '../components/Input'

export default defineField({
  name: 'formiumSelect',
  type: 'string',
  // Blank options object so we don't get 'undefined' in the component
  options: {},
  components: {
    input: (props) => Input(props),
  },
})
