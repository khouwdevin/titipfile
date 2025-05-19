import { mkdir, rm, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { dirname, join } from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const id = crypto.randomUUID()
  const uploadDir = join(process.cwd(), 'public', 'data', id)
  const filePath = join(uploadDir, file.name)

  try {
    await mkdir(dirname(filePath))
    await writeFile(filePath, buffer)

    return NextResponse.json({
      message: 'Upload success',
      data: {
        fileName: id,
      },
    })
  } catch {
    return NextResponse.json({ message: 'Failed to save file' })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { key } = await req.json()
    await rm(join(process.cwd(), 'public', 'data', key), {
      recursive: true,
      force: true,
    })

    return NextResponse.json({ message: 'Delete success', data: {} })
  } catch {
    return NextResponse.json(
      { message: 'Delete failed', data: {} },
      { status: 500 }
    )
  }
}
