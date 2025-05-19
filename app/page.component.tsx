'use client'

import { CircleButton } from '@/components/circlebutton'
import { DropFile } from '@/components/dropfile'
import { Button } from '@/components/ui/button'
import {
  Box,
  Center,
  Container,
  Group,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import NextLink from 'next/link'
import { BiSupport } from 'react-icons/bi'
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function HomeComponent({ serverTime }: { serverTime: number }) {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const parentRef = useRef<HTMLDivElement>(null)
  const oneRef = useRef<HTMLDivElement>(null)
  const twoRef = useRef<HTMLDivElement>(null)

  const updateScroll = (scroll: number) => {
    if (!oneRef.current || !twoRef.current) return

    const currentScroll = Math.floor(scroll)

    if (currentScroll <= 0) setCurrentPage(0)
    else setCurrentPage(1)
  }

  const scrollTo = (ref?: RefObject<HTMLDivElement | null>) => {
    if (!parentRef.current) return

    if (ref && ref.current) {
      parentRef.current.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'instant',
      })

      return
    }

    parentRef.current?.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  return (
    <Box
      ref={parentRef}
      css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      position="relative"
      overflowX="hidden"
      overflowY="auto"
      onScroll={(e) => updateScroll(e.currentTarget.scrollTop)}
      scrollSnapType="y mandatory"
      height="100vh"
    >
      <Center height="100vh" scrollSnapAlign="start" ref={oneRef}>
        <DropFile />
      </Center>

      <Center height="100vh" scrollSnapAlign="start" ref={twoRef}>
        <IntroductionSection />
      </Center>

      <Center position="fixed" right={2} top={0} height="100vh">
        <Stack direction="column">
          <Box onClick={() => scrollTo(oneRef)}>
            <CircleButton
              currentPage={currentPage}
              index={0}
              setCurrent={setCurrentPage}
              activeIcon={<HiHome />}
            />
          </Box>
          <Box onClick={() => scrollTo(twoRef)}>
            <CircleButton
              currentPage={currentPage}
              index={1}
              setCurrent={setCurrentPage}
              activeIcon={<FaInfo />}
            />
          </Box>
        </Stack>
      </Center>
    </Box>
  )
}

const fileTypes = [
  { title: 'General', value: 'image, video, audio, pdf' },
  { title: 'Text', value: 'txt, json, xml' },
  { title: 'Office', value: 'doc, xls, ppt, docx, xlsx, pptx' },
  { title: 'Compressed', value: 'zip, gzip, rar, tar' },
]

const IntroductionSection = () => {
  const [page, setPage] = useState<number>(0)
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <Container maxWidth={[380, 800]}>
      <Stack direction="column">
        <Text fontWeight="bold" fontSize={[30, 40]} textAlign="center">
          titipfile
        </Text>
        <Text textAlign="justify">
          <b>titipfile</b> is a secure and convenient way to share files online,
          now offering both <b>self-hosted</b> options and no time limits on
          your shared files. Unlike traditional file sharing services,{' '}
          <b>titipfile</b> provides the flexibility you need. You can choose our{' '}
          <b>hassle-free hosted service or deploy it yourself</b> for complete
          control. Easily upload any file and share it with anyone. This makes
          titipfile the ideal solution for various sharing needs, whether{' '}
          <b>temporary or ongoing</b>, all while keeping your storage organized.
          <PopoverRoot initialFocusEl={() => ref.current}>
            <PopoverTrigger asChild>
              <Link variant="underline">
                Check out the supported file types{' '}
              </Link>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold" fontSize={18}>
                {fileTypes[page].title}
              </PopoverHeader>
              <PopoverArrow />
              <PopoverBody>{fileTypes[page].value}</PopoverBody>
              <PopoverFooter>
                <Box fontSize="sm" flex="1">
                  {page + 1} of 4
                </Box>
                <Group>
                  <Button
                    size="sm"
                    onClick={() =>
                      setPage((prev) => (prev === 0 ? 3 : prev - 1))
                    }
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      setPage((prev) => (prev === 3 ? 0 : prev + 1))
                    }
                  >
                    Next
                  </Button>
                </Group>
              </PopoverFooter>
              <PopoverCloseTrigger />
            </PopoverContent>
          </PopoverRoot>
        </Text>
      </Stack>
    </Container>
  )
}
