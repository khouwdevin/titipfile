'use client'

import { Box, Center, Container, Flex, Link, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

const EXECPTION_PAGES_FOOTER = ['/v/']

const getFooterisTrue = (pathname: string) => {
  for (const pagePath of EXECPTION_PAGES_FOOTER) {
    if (pathname.startsWith(pagePath)) return false
  }

  return true
}

export default function Footer() {
  const pathname = usePathname()
  const isFooterTrue = getFooterisTrue(pathname)

  return (
    <Box
      width="100%"
      pt={4}
      position="absolute"
      bottom={0}
      display={isFooterTrue ? 'initial' : 'none'}
    >
      <Container mb={4}>
        <Center>
          <Flex direction="row" bg="black" p="10px 20px" borderRadius="lg">
            <Text
              color="white"
              fontWeight="bold"
              textAlign="center"
              fontSize={[14, 16]}
            >
              Powered by&nbsp;
            </Text>
            <Link
              href="https://khouwdevin.com"
              target="_blank"
              _hover={{ textDecoration: 'none' }}
              color="white"
              fontWeight="bold"
              textAlign="center"
              fontSize={[14, 16]}
            >
              khouwdevin.com
            </Link>
          </Flex>
        </Center>
      </Container>
    </Box>
  )
}
