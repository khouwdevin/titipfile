'use client'

import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { usePathname } from 'next/navigation'

export const NotFoundContext = createContext<{
  isNotFound: boolean
  setIsNotFound: Dispatch<SetStateAction<boolean>>
}>({ isNotFound: false, setIsNotFound: () => {} })

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const [isNotFound, setIsNotFound] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    return () => setIsNotFound(false)
  }, [pathname])

  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  )
}

export function useNotFound() {
  const context = useContext(NotFoundContext)

  return context
}
