import { NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function GET() {
  try {
    const fileList = await utapi.listFiles()
    const keys = fileList.files.map((file) => file.key)
    await utapi.deleteFiles(keys)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}
