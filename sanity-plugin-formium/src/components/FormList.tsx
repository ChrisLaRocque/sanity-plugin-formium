import {memo, useEffect, useState, type Dispatch, type SetStateAction} from 'react'
import {createClient, type Form} from '@formium/client'
import {StringInputProps} from 'sanity'
import {Secrets} from '../types'
import {Button, Card, Stack, Text} from '@sanity/ui'
import Loading from './Loading'

interface FormListProps extends StringInputProps {
  secrets: Secrets
  setOpen: Dispatch<SetStateAction<boolean>>
}
function FormList(props: FormListProps) {
  const {schemaType, secrets, setOpen} = props
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Initialize formium client
  const {projectId, token} = secrets
  // I'm sure there's a better approach than ignoring
  // @ts-ignore
  const formium = createClient(projectId, {
    apiToken: token,
  })

  // Get + set available forms from formium
  useEffect(() => {
    const getForms = async () => {
      try {
        const {data} = await formium.findForms()
        setForms(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching forms', error)
        setLoading(false)
      }
    }
    if (projectId && token) {
      getForms()
    }
  }, [forms, loading])

  // Add forms to the list of options
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
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  )
}
export default memo(FormList)
