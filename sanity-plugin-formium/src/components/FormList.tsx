import {useEffect, useState} from 'react'
import {Form, createClient} from '@formium/client'
import {StringInputProps} from 'sanity'
import {PluginConfig} from '../types'

export default function FormList(props: StringInputProps, config: PluginConfig) {
  const {schemaType} = props
  const [forms, setForms] = useState<Form[]>([])

  // Initialize formium client
  const {projectId, token} = config
  const formium = createClient(projectId, {
    apiToken: token,
  })

  // Get + set available forms from formium
  useEffect(() => {
    const getForms = async () => {
      const {data} = await formium.findForms()
      setForms(data)
    }
    getForms()
  }, [])

  if (forms && forms.length) {
    schemaType.options.list = forms.map(({name, id}) => {
      return {
        title: name,
        value: id,
      }
    })
  }
  return props.renderDefault(props)
}
