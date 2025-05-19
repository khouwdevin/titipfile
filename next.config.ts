import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
    API_KEY: process.env.API_KEY,
  },
}

export default nextConfig
