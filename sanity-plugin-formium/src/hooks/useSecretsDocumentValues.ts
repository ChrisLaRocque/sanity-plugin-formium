// import {useMemo} from 'react'
// import {useDocumentValues} from 'sanity'

// import {PluginConfig} from '../types'

// const path = ['token', 'projectId']
// const secretsDocumentId = 'secrets.formium'

// export const useSecretsDocumentValues = () => {
//   const {error, isLoading, value} = useDocumentValues<Partial<PluginConfig> | null | undefined>(
//     secretsDocumentId,
//     path,
//   )
//   const cache = useMemo(() => {
//     const exists = Boolean(value)
//     const secrets: PluginConfig = {
//       token: value?.token || null,
//       projectId: value?.projectId || null,
//     }
//     return {
//       isInitialSetup: !exists,
//       needsSetup: !secrets?.token || !secrets?.projectId,
//       secrets,
//     }
//   }, [value])

//   return {error, isLoading, value: cache}
// }
