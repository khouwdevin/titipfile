import seo from '@/components/seo'
import HistoryComponent from './page.component'

export const metadata = seo({
  templateTitle: 'History',
  description: 'history',
})

export default function History() {
  return <HistoryComponent />
}
