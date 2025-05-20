import { readdir, readFile, stat } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import mime from 'mime'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const key = (await params).key

  const dirPath = join(process.cwd(), 'data', key)
  const files = await readdir(dirPath)

  if (files.length > 0) {
    const filePath = join(dirPath, files[0])
    const fileStats = await stat(filePath)

    const file = await readFile(filePath)
    const type = mime.getType(filePath)

    return new NextResponse(file, {
      headers: {
        'content-type': type ?? 'text/plain',
        'content-length': fileStats.size.toString(),
        'content-disposition': files[0],
      },
    })
  }

  return NextResponse.error()
}
