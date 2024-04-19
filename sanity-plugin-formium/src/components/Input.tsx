import {useState} from 'react'
import {useSecretsDocumentValues} from '../hooks/useSecretsDocumentValues'
import FormList from './FormList'
import {StringInputProps} from 'sanity'
import ConfigureApi from './ConfigureApi'
import Loading from './Loading'

export default function Input(props: StringInputProps) {
  const [open, setOpen] = useState<boolean>(false)
  const {
    value: {secrets},
    isLoading,
  } = useSecretsDocumentValues()

  const secretError = !isLoading && (!secrets.token || !secrets.projectId)
  if (secretError) {
    setOpen(true)
  }

  return (
    <>
      {isLoading && !secretError ? <Loading /> : <FormList {...{...props, secrets, setOpen}} />}
      {open && <ConfigureApi setOpen={setOpen} />}
    </>
  )
}
