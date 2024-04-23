import {Card, Stack, Text} from '@sanity/ui'

export default function Loading() {
  return (
    <Stack padding={4} space={4}>
      <Card>
        <Text size={1}>Loading...</Text>
      </Card>
    </Stack>
  )
}
