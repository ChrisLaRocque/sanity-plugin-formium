import {useCallback} from 'react'
import type {SanityClient} from 'sanity'

import {saveSecrets} from '../actions/secrets'
import type {PluginConfig} from '../types'

export const useSaveSecrets = (client: SanityClient, secrets: Secrets) => {
  return useCallback(
    async ({
      token,
      projectId,
    }: Pick<PluginConfig, 'token' | 'projectId'>): Promise<PluginConfig> => {
      try {
        await saveSecrets(client, token!, projectId!)
      } catch (err) {
        console.error('Error while trying to save secrets:', err)
        throw err
      }

      return {
        token,
        projectId,
      }
    },
    [client, secrets],
  )
}
