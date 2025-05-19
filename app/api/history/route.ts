import { stat } from 'fs/promises'
import { readdir } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'
import mime from 'mime'

export async function GET() {
  try {
    const histories = []
    const dataPath = join(process.cwd(), 'public', 'data')
    const dirs = await readdir(dataPath)

    for (const dir of dirs) {
      const dirPath = join(dataPath, dir)
      const files = await readdir(dirPath)

      if (files.length > 0) {
        const filePath = join(dirPath, files[0])
        const fileStats = await stat(filePath)
        const type = mime.getType(filePath) ?? 'text/plain'

        histories.push({
          name: files[0],
          key: dir,
          uploadAt: fileStats.ctime.toString(),
          type,
        })
      }
    }

    return NextResponse.json({
      message: 'Get history success',
      data: {
        history: histories,
      },
    })
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
