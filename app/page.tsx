import seo from '@/components/seo'
import HomeComponent from './page.component'
import { getTime } from '@/utilities/server.function'

export const metadata = seo({})

export default async function Home() {
  const serverTime = await getTime()

  return <HomeComponent serverTime={serverTime} />
}
