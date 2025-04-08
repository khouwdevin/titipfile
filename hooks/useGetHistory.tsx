'use client'

import { useEffect, useState } from 'react'

export interface IHistory {
  key: string
  time: Date
  type: string
  name: string
}

export function useGetHistory() {
  const [history, setHistory] = useState<IHistory[] | null>(null)

  const getUserHistory = async () => {
    setHistory(null)
    const listHistory: IHistory[] = []
    const res = await fetch('https://api.uploadthing.com/v6/listFiles', {
      method: 'POST',
      headers: {
        'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    if (res.status === 200) {
      const { files } = await res.json()

      for (const file of files) {
        const resHeaders = await fetch(
          `${process.env.UPLOADTHING_URL}/${file.key}`,
          {
            method: 'HEAD',
          }
        )
        const type =
          resHeaders.headers.get('Content-Type')?.split('/')[0] ?? 'file'
        listHistory.push({
          key: file.key,
          name: file.name,
          time: new Date(file.uploadedAt),
          type,
        })
      }

      setHistory(listHistory)
    } else {
      setHistory([])
    }
  }

  useEffect(() => {
    getUserHistory()
  }, [])

  return { history, getUserHistory }
}
