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

const Timer = ({ serverTime }: { serverTime: number }) => {
  const [time, setTime] = useState<number>(serverTime)

  const calculateTime = (): string => {
    const minutes = Math.floor(time / 60)
    const hours = Math.floor(minutes / 60)

    const remainingSeconds = time % 60
    const remainingMinutes = minutes % 60

    return `${hours.toString().padStart(2, '0')}:${remainingMinutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev - 1 < 0) {
          return prev + 24 * 3600 - 1
        } else {
          return prev - 1
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Center position="absolute" top={[20, 2]} width="100%">
      <Stack direction="column">
        <Text textAlign="center" fontWeight="bold" fontSize={[30, 40]}>
          Next wipe
        </Text>
        <Text textAlign="center" fontSize={[18, 26]}>
          {calculateTime()}
        </Text>
      </Stack>
    </Center>
  )
}

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
      <Timer serverTime={serverTime} />

      <Center height="100vh" scrollSnapAlign="start" ref={oneRef}>
        <DropFile path="files" />
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
          <b>titipfile</b> is a secure and convenient way to share files online.
          Unlike traditional file sharing services that clutter your
          storage,&nbsp;
          <b>titipfile</b> is a <b>Software as a Service (SaaS)</b> designed for
          temporary file sharing. With <b>titipfile</b>, you can easily upload
          any file and share it with anyone. The files are automatically deleted
          at <b>00:00 UTC</b>, giving recipients ample time to download them
          while keeping your storage clean. This makes <b>titipfile</b> the
          perfect solution for anyone who needs to share files occasionally but
          doesn't want to deal with the hassle of overflowing storage on their
          local devices.{' '}
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
