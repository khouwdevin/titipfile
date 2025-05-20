import seo from '@/components/seo'
import FileKeyComponent from './page.component'
import { notFound } from 'next/navigation'
import { FILE_TYPE, getFileType } from '@/utilities/file.function'
import { join } from 'path'
import { readdir } from 'fs/promises'
import mime from 'mime'

const getMetadata = async (
  fileKey: string
): Promise<{ url: string; name: string; type: FILE_TYPE; status: number }> => {
  const dirPath = join(process.cwd(), 'data', fileKey)
  const files = await readdir(dirPath)

  if (files.length > 0) {
    const filePath = join(dirPath, files[0])
    const type = mime.getType(filePath)

    return {
      url: `/api/file/${fileKey}`,
      type: getFileType(type ?? 'text/plain'),
      name: files[0],
      status: 200,
    }
  }

  return {
    url: '',
    type: FILE_TYPE.OTHER,
    name: '',
    status: 400,
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
