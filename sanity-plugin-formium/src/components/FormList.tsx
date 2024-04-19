import {useEffect, useState, useCallback} from 'react'
import {Form, createClient} from '@formium/client'
import {StringInputProps} from 'sanity'
import {PluginConfig} from '../types'
import ConfigureApi from './ConfigureApi'

export default function FormList(props: StringInputProps, config: PluginConfig) {
  const {schemaType} = props
  const [forms, setForms] = useState<Form[]>([])
  const [open, setOpen] = useState(true)

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
    // Our schema forces options to exist
    // @ts-ignore
    schemaType.options.list = forms.map(({name, id}) => {
      return {
        title: name,
        value: id,
      }
    })
  }
  return <>{open ? <ConfigureApi setOpen={setOpen} /> : props.renderDefault(props)}</>
}
