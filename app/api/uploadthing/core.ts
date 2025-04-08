import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
    }
  },
})

export const ourFileRouter = {
  files: f({
    image: { maxFileSize: '1024GB' },
    video: { maxFileSize: '1024GB' },
    audio: { maxFileSize: '1024GB' },
    pdf: { maxFileSize: '1024GB' },
    text: { maxFileSize: '1024GB' },

    'application/vnd.android.package-archive': { maxFileSize: '1024GB' },

    'application/json': { maxFileSize: '1024GB' },
    'application/xml': { maxFileSize: '1024GB' },

    // Office files
    'application/msword': { maxFileSize: '1024GB' },
    'application/vnd.ms-excel': { maxFileSize: '1024GB' },
    'application/vnd.ms-powerpoint': { maxFileSize: '1024GB' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      maxFileSize: '1024GB',
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      maxFileSize: '1024GB',
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      { maxFileSize: '1024GB' },

    // Compressed files
    'application/zip': { maxFileSize: '1024GB' },
    'application/gzip': { maxFileSize: '1024GB' },
    'application/x-rar-compressed': { maxFileSize: '1024GB' },
    'application/x-tar': { maxFileSize: '1024GB' },
  })
    .middleware(async ({ req }) => {
      return { status: 'success' }
    })
    .onUploadComplete(({ metadata }) => {
      return { status: metadata.status }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
