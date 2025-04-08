import seo from '@/components/seo'
import FileKeyComponent from './page.component'
import { notFound } from 'next/navigation'
import { FILE_TYPE, getFileType } from '@/utilities/file.function'

const getMetadata = async (
  fileKey: string
): Promise<{ url: string; name: string; type: FILE_TYPE; status: number }> => {
  const res = await fetch(`${process.env.UPLOADTHING_URL}/${fileKey}`, {
    method: 'HEAD',
  })
  const headers = res.headers
  const type = headers.get('content-type') ?? ''
  const name = headers.get('content-disposition')?.split('"')[1] ?? ''

  const status = res.status

  return {
    url: `${process.env.UPLOADTHING_URL}/${fileKey}`,
    type: getFileType(type),
    name,
    status,
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ filekey: string }>
}) => {
  const fileKey = (await params).filekey
  const { name } = await getMetadata(fileKey)

  return seo({ templateTitle: name.split('.')[0], key: fileKey })
}

export default async function FileKey({
  params,
}: {
  params: Promise<{ filekey: string }>
}) {
  const fileKey = (await params).filekey
  const { url, type, name, status } = await getMetadata(fileKey)

  if (status === 200) {
    return <FileKeyComponent type={type} url={url} name={name} />
  }

  return notFound()
}
