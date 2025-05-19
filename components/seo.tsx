import { Metadata } from 'next'

const defaultMeta = {
  title: 'titipfile',
  description: 'Tempat untuk menitipkan file dengan mudah.',
  icon: 'https://titipfile.com/favicon.ico',
  url: 'https://titipfile.com/',
  siteName: 'Titip File',
  image: 'https://titipfile.com/api/og',
  keywords: ['titip file', 'titip foto', 'titip document'],
}

export default function seo({
  templateTitle,
  description,
  keywords,
  key,
}: {
  templateTitle?: string
  description?: string
  keywords?: string[]
  key?: string
}): Metadata {
  return {
    title: templateTitle ? templateTitle + ' | titipfile' : defaultMeta.title,
    description: description ? description : defaultMeta.description,
    keywords: [...defaultMeta.keywords, ...(keywords ?? [])],
    metadataBase: new URL(defaultMeta.url),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: './',
    },
    icons: {
      icon: defaultMeta.icon,
      shortcut: defaultMeta.icon,
      apple: 'https://titipfile.com/apple-touch-icon.png',
    },
    openGraph: {
      title: templateTitle ? templateTitle + ' | titipfile' : defaultMeta.title,
      description: description ? description : defaultMeta.description,
      url: './',
      siteName: defaultMeta.siteName,
      type: 'website',
      locale: 'en_US',
      images: {
        url: key
          ? `https://titipfile.com/api/og?key=${key}`
          : defaultMeta.image,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: templateTitle ? templateTitle + ' | titipfile' : defaultMeta.title,
      description: description ? description : defaultMeta.description,
      creator: '@titipfile',
      images: [
        key ? `https://titipfile.com/api/og?key=${key}` : defaultMeta.image,
      ],
    },
  }
}
