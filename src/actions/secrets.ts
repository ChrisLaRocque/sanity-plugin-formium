import type {SanityClient} from 'sanity'

interface SecretsDocument {
  _id: 'secrets.formium'
  _type: 'formium.apiKey'
  token: string
  projectId: string
}

export function saveSecrets(
  client: SanityClient,
  token: string,
  projectId: string,
): Promise<SecretsDocument> {
  const doc: SecretsDocument = {
    _id: 'secrets.formium',
    _type: 'formium.apiKey',
    token,
    projectId,
  }

  return client.createOrReplace(doc)
}
