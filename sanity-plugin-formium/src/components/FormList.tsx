import {useEffect, useState} from 'react'
import {createClient, type Form} from '@formium/client'
import {StringInputProps} from 'sanity'
import {PluginConfig} from '../types'

interface FormListProps extends StringInputProps {
  secrets: PluginConfig
}
export default function FormList(props: FormListProps) {
  const {schemaType, secrets} = props
  const [forms, setForms] = useState<Form[]>([])
  console.log('props', props)
  // Initialize formium client
  const {projectId, token} = secrets
  const formium = createClient(projectId, {
    apiToken: token,
  })

  // Get + set available forms from formium
  useEffect(() => {
    const getForms = async () => {
      const {data} = await formium.findForms()
      setForms(data)
    }
    if (projectId && token) {
      getForms()
    }
  }, [])

  if (forms && forms.length) {
    // Our schema forces options to exist
    // @ts-ignore
    schemaType.options.list = forms.map(({name, id}) => {
      return {
        title: name,
        value: id,
      }
    })
  }
  return props.renderDefault(props)
}
