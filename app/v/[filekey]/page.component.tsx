'use client'

import { Box, Center, IconButton, Image, Stack } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { HiHome } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@/components/ui/tooltip'
import { IoMdDownload } from 'react-icons/io'
import { FILE_TYPE } from '@/utilities/file.function'

export default function FileKeyComponent({
  type,
  url,
  name,
}: {
  type: FILE_TYPE
  url: string
  name: string
}) {
  const router = useRouter()

  const downloadImage = async () => {
    const res = await fetch(url)
    const blob = await res.blob()
    const tempUrl = URL.createObjectURL(blob)

    const aElement = document.createElement('a')

    aElement.href = tempUrl
    aElement.setAttribute('download', name)

    document.body.appendChild(aElement)

    aElement.click()

    document.body.removeChild(aElement)
  }

  return (
    <>
      {type === FILE_TYPE.IMAGE && (
        <Center minHeight="100vh" bg="blackAlpha.900">
          <Box>
            <Image width="100%" height="100%" maxHeight="100vh" src={url} />
          </Box>
        </Center>
      )}
      {type === FILE_TYPE.VIDEO && (
        <Center minHeight="100vh" bg="blackAlpha.900">
          <video
            autoPlay
            src={url}
            controls
            style={{
              width: '100wh',
              height: '100vh',
            }}
          />
        </Center>
      )}
      {type === FILE_TYPE.AUDIO && (
        <Center minHeight="100vh" bg="blackAlpha.900">
          <audio src={url} controls autoPlay />
        </Center>
      )}
      {type === FILE_TYPE.PDF && (
        <Box width="100wh" height="100vh">
          <object
            data={url}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </Box>
      )}
      {type === FILE_TYPE.OTHER && (
        <Center minHeight="100vh" bg="blackAlpha.900">
          <Button colorPalette="blackAlpha" onClick={() => window.open(url)}>
            Download file
          </Button>
        </Center>
      )}

      <Stack direction="column" position="fixed" right={8} bottom={4}>
        {type === FILE_TYPE.IMAGE && (
          <Tooltip
            content="download image"
            showArrow
            positioning={{ placement: 'left' }}
          >
            <IconButton
              borderRadius="full"
              colorPalette="whiteAlpha"
              onClick={downloadImage}
            >
              <IoMdDownload />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          content="back to home"
          showArrow
          positioning={{ placement: 'left' }}
        >
          <IconButton
            borderRadius="full"
            colorPalette="whiteAlpha"
            onClick={() => router.push('/')}
          >
            <HiHome />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  )
}
