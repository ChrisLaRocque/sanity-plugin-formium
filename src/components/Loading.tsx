import {Card, Text} from '@sanity/ui'

export default function Loading(): JSX.Element {
  return (
    <Card tone="transparent" padding={3} radius={2} border>
      <Text size={1}>Loading...</Text>
    </Card>
  )
}
