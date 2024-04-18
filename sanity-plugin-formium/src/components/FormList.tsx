import {useEffect, useState} from 'react'
import {createClient} from '@formium/client'

export default function FormList(props) {
  const {
    schemaType: {fields},
  } = props
  const [forms, setForms] = useState([])
  const {projectId, token} = props.pluginConfig
  const formium = createClient(projectId, {
    apiToken: token,
  })
  useEffect(() => {
    const getForms = async () => {
      const {data} = await formium.findForms()
      console.log('forms', data)
      setForms(data)
    }
    getForms()
  }, [])
  if (forms && forms.length) {
    console.log('fields', fields)
    fields[0].type.options.list = forms.map(({name, id}) => {
      return {
        title: name,
        value: id,
      }
    })
  }
  return props.renderDefault(props)
}
