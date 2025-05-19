import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    API_KEY: process.env.API_KEY,
  },
}

export default nextConfig
