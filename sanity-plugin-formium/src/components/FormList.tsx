import {useEffect, useState} from 'react'
import {createClient, type Form} from '@formium/client'
import {StringInputProps} from 'sanity'
import {Secrets} from '../types'
import {Button, Card, Stack, Text} from '@sanity/ui'

interface FormListProps extends StringInputProps {
  secrets: Secrets
}
export default function FormList(props: FormListProps) {
  const {schemaType, secrets, setOpen} = props
  const [forms, setForms] = useState<Form[]>([])

  // Initialize formium client
  const {projectId, token} = secrets
  const formium = createClient(projectId, {
    apiToken: token,
  })

  // Get + set available forms from formium
  useEffect(() => {
    const getForms = async () => {
      try {
        const {data} = await formium.findForms()
        setForms(data)
      } catch (error) {
        console.error('Error fetching forms', error)
      }
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

  return (
    <>
      {forms && forms.length ? (
        props.renderDefault(props)
      ) : (
        <Stack padding={4} space={4}>
          <Card>
            <Text size={1}>No forms found. Do you need to make one?</Text>
          </Card>
          <Card>
            <Button fontSize={1} text={'Check API settings'} onClick={(e) => setOpen(true)} />
          </Card>
        </Stack>
      )}
    </>
  )
}
