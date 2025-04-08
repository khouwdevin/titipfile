'use client'

import { Box, IconButton } from '@chakra-ui/react'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useNotFound } from '@/hooks/useNotFound'
import { HiHome } from 'react-icons/hi'

const EXECPTION_PAGES_NAVBAR = ['/v/']

const getNavbarisTrue = (pathname: string) => {
  for (const pagePath of EXECPTION_PAGES_NAVBAR) {
    if (pathname.startsWith(pagePath)) return false
  }

  return true
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { isNotFound } = useNotFound()

  const isTrueNavbar = getNavbarisTrue(pathname)

  return (
    <>
      <Box
        display={isTrueNavbar && !isNotFound ? 'initial' : 'none'}
        position="fixed"
        top={4}
        left={4}
        zIndex={10}
      >
        <IconButton
          borderRadius="full"
          colorPalette="whiteAlpha"
          onClick={() => router.push('/')}
        >
          <HiHome />
        </IconButton>
      </Box>

      <Box
        display={isTrueNavbar && !isNotFound ? 'initial' : 'none'}
        position="fixed"
        top={4}
        right={4}
        zIndex={10}
      >
        <Button onClick={() => router.push('/history')}>History</Button>
      </Box>
    </>
  )
}
