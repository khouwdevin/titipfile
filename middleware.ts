import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const headers = req.headers
    const path = req.nextUrl.pathname

    const auth = headers.get('authorization')
    const token = auth?.split(' ')[1]

    if (path === '/api/og' || path.startsWith('/api/file/'))
      return NextResponse.next()
    else if (token === process.env.API_KEY) return NextResponse.next()

    return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
  } catch {
    return NextResponse.json({ message: 'Server error!' }, { status: 500 })
  }
}

export const config = { matcher: ['/api/:path*'] }
