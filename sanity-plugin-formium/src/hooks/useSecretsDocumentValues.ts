import {useMemo} from 'react'
import {useDocumentValues} from 'sanity'

import {Secrets} from '../types'

const path = ['token', 'projectId']
const secretsDocumentId = 'secrets.formium'

export const useSecretsDocumentValues = () => {
  const {error, isLoading, value} = useDocumentValues<Partial<Secrets> | null | undefined>(
    secretsDocumentId,
    path,
  )
  const cache = useMemo(() => {
    const exists = Boolean(value)
    const secrets: Secrets = {
      token: value?.token,
      projectId: value?.projectId,
    }
    return {
      isInitialSetup: !exists,
      needsSetup: !secrets?.token || !secrets?.projectId,
      secrets,
    }
  }, [value])

  return {error, isLoading, value: cache}
}
