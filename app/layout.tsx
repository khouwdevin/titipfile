'use client'

import { Providers } from '@/components/chakraprovider'
import { Toaster } from '@/components/ui/toaster'
import { Box, ClientOnly, Stack } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import { NotFoundProvider } from '@/hooks/useNotFound'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <NotFoundProvider>
          <Providers>
            <Toaster />

            <ClientOnly>
              <Box>
                <Navbar />
                <Stack position="relative" direction="column" minHeight="100vh">
                  {children}
                  <Footer />
                </Stack>
              </Box>
            </ClientOnly>
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  )
}
