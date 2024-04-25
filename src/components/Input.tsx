import {SettingsView, useSecrets} from '@sanity/studio-secrets'
import {Button, Card, Flex, Text} from '@sanity/ui'
import {useEffect, useState} from 'react'
import type {StringInputProps} from 'sanity'

import type {Secrets} from '../types'
import FormList from './FormList'
import Loading from './Loading'

const namespace = 'formiumPlugin'

const pluginConfigKeys = [
  {
    key: 'projectId',
    title: 'Your project ID',
  },
  {
    key: 'token',
    title: 'Your secret API token',
  },
]

export default function Input(props: StringInputProps): JSX.Element {
  const {loading, secrets} = useSecrets<Secrets>(namespace)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!loading && (!secrets || !secrets.token || !secrets.projectId)) {
      setShowSettings(false)
    }
  }, [loading, secrets])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {showSettings && (
        <SettingsView
          title={'Formium API settings'}
          namespace={namespace}
          keys={pluginConfigKeys}
          // eslint-disable-next-line react/jsx-no-bind
          onClose={() => setShowSettings(false)}
        />
      )}

      {!loading && secrets?.token && secrets?.projectId ? (
        <FormList {...{...props, secrets, setOpen: setShowSettings}} />
      ) : (
        <>
          <Card tone="caution" paddingLeft={2} radius={2} border>
            <Flex padding={1} align="center">
              <Text size={1} style={{flex: '1'}}>
                Please provide your Formium API credentials
              </Text>
              {/*  eslint-disable-next-line react/jsx-no-bind */}
              <Button
                mode="ghost"
                size={1}
                fontSize={1}
                justify="flex-end"
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => setShowSettings(true)}
                text="API settings"
                padding={2}
              />
            </Flex>
          </Card>
        </>
      )}
    </>
  )
}
