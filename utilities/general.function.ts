import { toaster } from '@/components/ui/toaster'

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text).catch(() =>
      toaster.create({
        title: 'Window is not focus, failed to copy URL!',
        type: 'error',
      })
    )

    toaster.create({ title: 'URL copied successfully!', type: 'success' })
  } catch {
    toaster.create({
      title: 'Copy to clipboard not working!',
      type: 'error',
    })
  }
}
