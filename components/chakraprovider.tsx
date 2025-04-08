'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './ui/color-mode'
import system from '@/libs/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider enableSystem={false}>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}
