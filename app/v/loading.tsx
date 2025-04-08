'use client'

import { Center, Spinner, Stack, Text } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Center bg="blackAlpha.900" minHeight="100vh">
      <Stack direction="row" alignItems="center" gap={4}>
        <Spinner color="white" size={['md', 'lg']} />
        <Text color="white" fontWeight="bold" fontSize={[30, 40]}>
          Loading...
        </Text>
      </Stack>
    </Center>
  )
}
