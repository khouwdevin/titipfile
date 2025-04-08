import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_URL: process.env.UPLOADTHING_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  },
}

export default nextConfig
