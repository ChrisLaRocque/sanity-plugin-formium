import {useCallback, useId, useState} from 'react'
import {Dialog, Flex, Box, Stack, Inline, Button, TextInput} from '@sanity/ui'
import FormField from './FormField'
import FormiumLogo from './FormiumLogo'
import {useSecretsDocumentValues} from '../hooks/useSecretsDocumentValues'
import {useClient} from 'sanity'
import {useSaveSecrets} from '../hooks/useSaveSecrets'

// Header for modal
function Header() {
  return (
    <Flex padding={4} align={'center'} justify={'space-between'} direction="column">
      <FormiumLogo />
    </Flex>
  )
}

export default function ConfigureApi({setOpen}) {
  // Sanity get + set
  const client = useClient({apiVersion: '2024-04-18'})
  const {
    value: {secrets},
    isLoading,
  } = useSecretsDocumentValues()
  const handleSaveSecrets = useSaveSecrets(client, secrets)

  // UI states
  const [submitting, setSubmitting] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  // Form field values
  const [projectId, setProjectId] = useState(secrets.projectId)
  const [token, setToken] = useState(secrets.token)

  // Submit handler
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    const {target} = event
    // TODO - don't do this
    handleSaveSecrets({projectId: target[0].value, token: target[1].value})
      .catch((err) => console.error('Error saving secrets', err))
      .finally(() => {
        setSubmitting(false)
        setOpen(false)
      })
  }, [])

  return (
    <Dialog
      animate
      id={`ConfigureApi${useId()}`}
      onClose={onClose}
      header={<Header />}
      width={1}
      style={{
        maxWidth: '550px',
      }}
    >
      <Box padding={4}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack space={4}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <FormField title="Project ID" inputId={'projectId'}>
                  <TextInput
                    id={'projectId'}
                    value={projectId}
                    onChange={(e) => setProjectId(e.currentTarget.value)}
                    type="text"
                    required={true}
                    // required={!!state.projectId || state.enableSignedUrls}
                  />
                </FormField>
                <FormField title="Token" inputId={'token'}>
                  <TextInput
                    id={'token'}
                    value={token}
                    onChange={(e) => setToken(e.currentTarget.value)}
                    type="text"
                    required={true}
                    // required={!!state.projectId || state.enableSignedUrls}
                  />
                </FormField>
              </>
            )}
            <Inline space={2}>
              <Button
                text="Save"
                disabled={submitting || isLoading}
                loading={submitting}
                tone="primary"
                mode="default"
                type="submit"
              />
              {/* <Button disabled={submitting} text="Cancel" mode="bleed" onClick={onClose} /> */}
            </Inline>
          </Stack>
        </form>
      </Box>
    </Dialog>
  )
}
