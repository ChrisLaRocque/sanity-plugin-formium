import {createClient, type Form} from '@formium/client'
import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {type Dispatch, memo, type SetStateAction, useEffect, useState} from 'react'
import {StringInputProps} from 'sanity'

import {Secrets} from '../types'
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

  // If either are blank, get the API details
  if (!projectId || !token) {
    setOpen(true)
  }

  // projectId throws a type error
  const formium = createClient(projectId || '', {
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
      setLoading(false)
    }
    if (projectId && token && formium) {
      getForms()
    }
  }, [formium, forms, loading, projectId, token])

  // Add forms to the list of options
  if (forms && forms.length && schemaType?.type?.jsonType === 'string' && schemaType.options) {
    // Our schema forces options to exist
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
            <Stack space={2}>
              <Card>{props.renderDefault(props)}</Card>
              <Card>
                <Flex justify={'flex-end'} padding={1}>
                  {/*  eslint-disable-next-line react/jsx-no-bind */}
                  <a onClick={() => setOpen(true)} style={{cursor: 'pointer'}}>
                    <Text size={1}>API settings</Text>
                  </a>
                </Flex>
              </Card>
            </Stack>
          ) : (
            <Stack padding={4} space={4}>
              <Card>
                <Text size={1}>No forms found. Do you need to make one?</Text>
              </Card>
              <Card>
                {/*  eslint-disable-next-line react/jsx-no-bind */}
                <Button fontSize={1} text={'Check API settings'} onClick={() => setOpen(true)} />
              </Card>
            </Stack>
          )}
        </>
      )}
    </>
  )
}
export default memo(FormList)
