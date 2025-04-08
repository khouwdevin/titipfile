import { createRouteHandler } from 'uploadthing/next'

import { ourFileRouter } from './core'
import { UTApi } from 'uploadthing/server'
import { NextResponse } from 'next/server'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})

export const DELETE = async (req: Request) => {
  const { key } = await req.json()
  const utapi = new UTApi()

  await utapi.deleteFiles(key)

  return NextResponse.json({ status: 'success' })
}
