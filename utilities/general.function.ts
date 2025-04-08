import { toaster } from '@/components/ui/toaster'

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toaster.create({ title: 'URL copied successfully!', type: 'success' })
    })
    .catch(() => {
      toaster.create({
        title: 'Window is not focus, failed to copy URL!',
        type: 'error',
      })
    })
}
