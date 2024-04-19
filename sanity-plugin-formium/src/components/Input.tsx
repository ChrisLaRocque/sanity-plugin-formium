import {Suspense, useState} from 'react'
import {useSecretsDocumentValues} from '../hooks/useSecretsDocumentValues'
import FormList from './FormList'
import {StringInputProps} from 'sanity'
import ConfigureApi from './ConfigureApi'

export default function Input(props: StringInputProps) {
  const [open, setOpen] = useState(false)
  const {
    value: {secrets},
    isLoading,
  } = useSecretsDocumentValues()

  const secretError = !isLoading && (!secrets.token || !secrets.projectId)
  if (secretError) {
    setOpen(true)
  }

  return (
    <Suspense fallback={<div>Loading</div>}>
      {isLoading && !secretError ? <div>Loading...</div> : <FormList {...{...props, secrets}} />}
      {open && <ConfigureApi setOpen={setOpen} />}
    </Suspense>
  )
}
