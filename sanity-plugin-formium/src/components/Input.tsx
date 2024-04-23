import {SettingsView, useSecrets} from '@sanity/studio-secrets'
import React, {useEffect, useState} from 'react'
import {StringInputProps} from 'sanity'
import Loading from './Loading'
import type {Secrets} from '../types'
import FormList from './FormList'

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

export default function Input(props: StringInputProps) {
  const {loading, secrets} = useSecrets<Secrets>(namespace)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!loading && (!secrets || !secrets.token || !secrets.projectId)) {
      setShowSettings(true)
    }
  }, [secrets])
  if (loading) {
    return <Loading />
  }
  if (!loading && !showSettings && secrets?.token && secrets?.projectId) {
    return <FormList {...{...props, secrets, setOpen: setShowSettings}} />
  }

  return (
    <>
      <SettingsView
        title={'Formium API settings'}
        namespace={namespace}
        keys={pluginConfigKeys}
        // eslint-disable-next-line react/jsx-no-bind
        onClose={() => setShowSettings(false)}
      />
      {props.renderDefault({...props, readOnly: true})}
    </>
  )
}
