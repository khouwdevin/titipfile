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
    const res = await fetch('/api/history', {
      method: 'GET',
      headers: {
        authorization: `Basic ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      const { data } = await res.json()
      const { history } = data

      for (const file of history) {
        const resHeaders = await fetch(`/api/file/${file.key}`, {
          method: 'HEAD',
          headers: {
            authorization: `Basic ${process.env.API_KEY}`,
          },
        })
        const type =
          resHeaders.headers.get('Content-Type')?.split('/')[0] ?? 'file'
        listHistory.push({
          key: file.key,
          name: file.name,
          time: new Date(file.uploadAt),
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
