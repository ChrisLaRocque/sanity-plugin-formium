import {useEffect, useState} from 'react'
import {Form, createClient} from '@formium/client'
import {ObjectFieldProps} from 'sanity'
import {PluginConfig} from '../types'

export default function FormList(props: ObjectFieldProps, config: PluginConfig) {
  const {
    schemaType: {fields},
  } = props
  const [forms, setForms] = useState<Form[]>([])
  const {projectId, token} = config
  const formium = createClient(projectId, {
    apiToken: token,
  })
  useEffect(() => {
    const getForms = async () => {
      const {data} = await formium.findForms()
      setForms(data)
    }
    getForms()
  }, [])
  if (forms && forms.length) {
    // Bold assumption that there will only be 1 field and/or that the field will be first
    fields[0].type.options.list = forms.map(({name, id}) => {
      return {
        title: name,
        value: id,
      }
    })
  }
  return props.renderDefault(props)
}
