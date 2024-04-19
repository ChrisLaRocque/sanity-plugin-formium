import {useCallback, useId, useState} from 'react'
import {Dialog, Box, Text, Stack, Inline, Button} from '@sanity/ui'

function Header() {
  return (
    <>
      <Text>API Credentials</Text>
    </>
  )
}
export default function ConfigureApi({setOpen}) {
  const [submitting, setSubmitting] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  // const onOpen = useCallback(() => setOpen(true), [])
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => event.preventDefault(),
    [],
  )
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
            <Inline space={2}>
              <Button
                text="Save"
                // disabled={!dirty}
                loading={submitting}
                tone="primary"
                mode="default"
                type="submit"
              />
              <Button disabled={submitting} text="Cancel" mode="bleed" onClick={onClose} />
            </Inline>
          </Stack>
        </form>
      </Box>
    </Dialog>
  )
}
