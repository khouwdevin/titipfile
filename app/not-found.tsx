'use client'

import { Button } from '@/components/ui/button'
import { useNotFound } from '@/hooks/useNotFound'
import { Center, Separator, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFoundPage() {
  const router = useRouter()

  const { setIsNotFound } = useNotFound()

  useEffect(() => {
    setIsNotFound(true)
  }, [])

  return (
    <>
      <title>404: Page not found</title>

      <Center height="100vh">
        <Stack direction="column">
          <Stack direction="row" alignItems="center">
            <Text fontWeight="bold" fontSize={24}>
              404
            </Text>
            <Center height="40px" width="10px">
              <Separator
                orientation="vertical"
                borderColor="gray"
                borderWidth={1}
                borderRadius="sm"
              />
            </Center>
            <Text>This page could not be found.</Text>
          </Stack>

          <Center>
            <Button onClick={() => router.push('/')} variant="solid">
              Back to home
            </Button>
          </Center>
        </Stack>
      </Center>
    </>
  )
}
