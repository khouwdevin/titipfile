import { OurFileRouter } from '@/app/api/uploadthing/core'
import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { genUploader, UploadAbortedError } from 'uploadthing/client'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { toaster } from './ui/toaster'
import { Slider } from './ui/slider'
import { MdFileUpload, MdOutlineContentCopy } from 'react-icons/md'
import { CiFileOn } from 'react-icons/ci'
import { Tooltip } from './ui/tooltip'
import { IoMdClose } from 'react-icons/io'
import { checkFileSize, checkFileType } from '@/utilities/file.function'
import { copyToClipboard } from '@/utilities/general.function'
import { Button } from './ui/button'

interface IDropFile {
  value?: string
  toastTextSuccess?: string
  toastTextFailed?: string
  singleFile?: boolean
  path: keyof OurFileRouter
}

export function DropFile({
  toastTextSuccess,
  toastTextFailed,
  path,
}: IDropFile) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const [progress, setProgress] = useState<number>(0)

  const [currentFile, setCurrentFile] = useState<File | null>()
  const [currentUrl, setCurrentUrl] = useState<string>('')

  const abortController = new AbortController()

  const { uploadFiles } = genUploader<OurFileRouter>({
    package: '@uploadthing/react',
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const dragOverHanlder = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    dropRef.current?.classList.add('drag-over')
  }

  const dragLeaveHanlder = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    dropRef.current?.classList.remove('drag-over')
  }

  const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isUploading) return

    if (e.dataTransfer.files.length > 0) {
      setIsLoading(true)

      const tempFile = e.dataTransfer.files[0]

      const isUploadable =
        checkFileType(tempFile.type) && checkFileSize(tempFile.size)

      if (isUploadable) {
        setCurrentFile(tempFile)
        setCurrentUrl('')
      } else {
        setCurrentFile(null)
        setCurrentUrl('')
      }

      setIsLoading(false)
    }
  }

  const filePickerHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return

    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true)

      const tempFile = e.target.files[0]

      const isUploadable =
        checkFileType(tempFile.type) && checkFileSize(tempFile.size)

      if (isUploadable) {
        setCurrentFile(tempFile)
        setCurrentUrl('')
      } else {
        setCurrentFile(null)
        setCurrentUrl('')
      }

      setIsLoading(false)
    }
  }

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true)

      const res = await uploadFiles(path, {
        files: [file],
        signal: abortController.signal,
        onUploadProgress: ({ progress }: { progress: number }) =>
          setProgress(progress),
      })

      const url = res[0].url

      setCurrentUrl(url.split('/')[4])

      setCurrentFile(null)

      setProgress(0)
      setIsUploading(false)

      copyToClipboard(`${window.location.origin}/v/${url.split('/')[4]}`)

      toaster.create({
        title: toastTextSuccess ?? 'Upload success!',
        type: 'success',
      })
    } catch (e) {
      setCurrentUrl('')
      setProgress(0)

      setIsUploading(false)

      if (e instanceof UploadAbortedError) {
        toaster.create({ title: 'Upload is cancelled!', type: 'info' })
      } else {
        toaster.create({
          title: toastTextFailed ?? 'Upload failed!',
          type: 'error',
        })
      }
    }
  }

  return (
    <>
      <input
        key={currentFile?.name}
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={filePickerHandler}
      />

      <Center>
        <Stack
          direction="column"
          alignItems="center"
          gap={4}
          position="relative"
        >
          {currentFile && (
            <Stack direction="row" position="absolute" right={4} top={4}>
              <Tooltip content="upload file" showArrow>
                <IconButton
                  variant="subtle"
                  colorPalette="whiteAlpha"
                  zIndex={10}
                  onClick={() => uploadFile(currentFile)}
                  disabled={isUploading}
                >
                  <MdFileUpload />
                </IconButton>
              </Tooltip>

              <Tooltip content="reset" showArrow>
                <IconButton
                  variant="subtle"
                  colorPalette="whiteAlpha"
                  zIndex={10}
                  onClick={() => setCurrentFile(null)}
                  disabled={isUploading}
                >
                  <IoMdClose />
                </IconButton>
              </Tooltip>
            </Stack>
          )}

          <Box
            borderRadius="lg"
            cursor="pointer"
            onClick={() => {
              if (!isUploading) inputRef.current?.click()
            }}
            ref={dropRef}
            onDrop={dropHandler}
            onDragLeave={dragLeaveHanlder}
            onDragOver={dragOverHanlder}
            borderWidth={3}
            borderColor="black"
            width={[350, 700]}
            height={[250, 300]}
          >
            <Center height="100%">
              {isLoading ? (
                <Stack direction="row" alignItems="center" gap={4}>
                  <Spinner size="lg" />
                  <Text fontWeight="bold" fontSize={28}>
                    Loading...
                  </Text>
                </Stack>
              ) : currentFile ? (
                <Flex direction="column" alignItems="center" gap={4}>
                  <Flex direction="row" alignItems="center" gap={4}>
                    <Icon fontSize="45px">
                      {isUploading ? <AiOutlineCloudUpload /> : <CiFileOn />}
                    </Icon>
                    <Text
                      fontSize={20}
                      fontWeight="semibold"
                      whiteSpace="balance"
                      wordBreak="break-word"
                      lineClamp={3}
                      maxWidth={['180px', '100%']}
                    >
                      {currentFile.name}
                    </Text>
                  </Flex>

                  {isUploading && (
                    <Slider
                      readOnly
                      aria-label={['loading-slider']}
                      value={[progress]}
                      thumbSize={null}
                      thumbAlignment="contain"
                      width="100%"
                    />
                  )}

                  {isUploading && (
                    <Box>
                      <Button onClick={() => abortController.abort()}>
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Flex>
              ) : (
                <Flex direction="row" alignItems="center" gap={4}>
                  <Image src="logo.png" width="50px" height="50px" />
                  <Text fontSize={20} fontWeight="semibold">
                    Drop file here
                  </Text>
                </Flex>
              )}
            </Center>
          </Box>

          {currentUrl.length > 0 && (
            <Stack direction="row" alignItems="center">
              <IconButton
                variant="outline"
                onClick={() =>
                  copyToClipboard(`${window.location.origin}/v/${currentUrl}`)
                }
              >
                <MdOutlineContentCopy />
              </IconButton>
              <Text>Your file url: </Text>
              <Link
                variant="underline"
                target="_blank"
                href={`${window.location.origin}/v/${currentUrl}`}
              >
                <Flex maxWidth={['200px', 'full']}>
                  <Text
                    truncate
                  >{`${window.location.origin}/v/${currentUrl}`}</Text>
                </Flex>
              </Link>
            </Stack>
          )}
        </Stack>
      </Center>
    </>
  )
}
