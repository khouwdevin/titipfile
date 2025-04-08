'use server'

import { cookies } from 'next/headers'

export const setGuestCookie = async () => {
  const cookie = await cookies()

  cookie.set('date', new Date().toString())
  cookie.set('newGuest', 'false')
}

export const getServerDate = async () => {
  return new Date()
}

export const getTime = async (): Promise<number> => {
  const _ = await cookies()
  const date = new Date()

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()

  return 24 * 3600 - (hours * 3600 + minutes * 60 + seconds)
}
