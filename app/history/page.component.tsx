'use client'

import { getIconType } from '@/components/filecomponent'
import { toaster } from '@/components/ui/toaster'
import { IHistory, useGetHistory } from '@/hooks/useGetHistory'
import { copyToClipboard } from '@/utilities/general.function'
import {
  Box,
  Button,
  Center,
  Container,
  Icon,
  IconButton,
  Link,
  Spacer,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FiFile } from 'react-icons/fi'
import { MdOutlineContentCopy } from 'react-icons/md'

const HistoryCard = ({
  history,
  index,
  isLoading,
  setIsLoading,
  getUserHistory,
}: {
  history: IHistory
  index: number
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  getUserHistory: () => Promise<void>
}) => {
  const date = history.time
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const time = `${hours > 12 ? date.getHours() - 12 : date.getHours()}:${minutes
    .toString()
    .padStart(2, '0')} ${hours > 12 ? 'PM' : 'AM'}`

  const deleteFile = async () => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          key: history.key,
        }),
      })

      if (res.status === 200) {
        await getUserHistory()

        toaster.create({ title: 'Delete success!', type: 'success' })
      } else {
        toaster.create({ title: 'Delete failed!', type: 'error' })
      }
    } catch (e) {
      console.log(e)
      toaster.create({ title: 'Delete failed!', type: 'error' })
    }

    setIsLoading(false)
  }

  return (
    <Box p="20px 30px" borderRadius="lg" bg="gray.200" width="100%">
      <Stack direction="row" alignItems="center">
        <Text fontSize={[18, 20]} fontWeight="bold" mr={2}>
          {index}.
        </Text>
        <Icon fontSize={[26, 30]}>{getIconType(history.type)}</Icon>
        <Link
          fontSize={[18, 20]}
          href={`/v/${history.key}`}
          target="_blank"
          variant="underline"
          maxWidth={['70px', 400]}
          truncate
        >
          <Text truncate>{history.name}</Text>
        </Link>

        <Spacer />
        <Text
          mr={[1, 4]}
          width="70px"
          fontSize={[14, 16]}
          fontWeight="semibold"
        >
          {time}
        </Text>
        <IconButton
          onClick={() =>
            copyToClipboard(`${window.location.origin}/v/${history.key}`)
          }
        >
          <MdOutlineContentCopy />
        </IconButton>
        <IconButton
          colorPalette="red"
          disabled={isLoading}
          onClick={deleteFile}
        >
          <FaRegTrashAlt />
        </IconButton>
      </Stack>
    </Box>
  )
}

const EmptyHistoryCard = () => {
  return (
    <Box p="20px 30px" borderRadius="lg" bg="gray.200" width="100%">
      <Center>
        <Stack direction="row" alignItems="center">
          <Text fontSize={[18, 20]}>No history</Text>
          <Icon fontSize={[26, 30]}>
            <FiFile />
          </Icon>
        </Stack>
      </Center>
    </Box>
  )
}

export default function HistoryComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { history, getUserHistory } = useGetHistory()

  return (
    <Container mt={24} maxWidth={[400, 800]} pb={24}>
      <Stack direction="column" gap={8} width="100%">
        <Center>
          <Box>
            <Button onClick={getUserHistory}>Reload</Button>
          </Box>
        </Center>

        {history &&
          history.map((currentHistory, index) => (
            <HistoryCard
              key={currentHistory.key}
              history={currentHistory}
              index={index + 1}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              getUserHistory={getUserHistory}
            />
          ))}

        {history && history.length <= 0 && <EmptyHistoryCard />}
        {history === null && (
          <Center minHeight="70vh">
            <Spinner size="xl" />
          </Center>
        )}
      </Stack>
    </Container>
  )
}
