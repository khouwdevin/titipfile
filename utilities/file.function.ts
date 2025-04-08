import { toaster } from '@/components/ui/toaster'

export enum FILE_TYPE {
  AUDIO,
  IMAGE,
  VIDEO,
  PDF,
  OTHER,
}

export const getFileType = (type: string): FILE_TYPE => {
  if (type.includes('audio')) {
    return FILE_TYPE.AUDIO
  } else if (type.includes('video')) {
    return FILE_TYPE.VIDEO
  } else if (type.includes('image')) {
    return FILE_TYPE.IMAGE
  } else if (type.includes('pdf')) {
    return FILE_TYPE.PDF
  }
  return FILE_TYPE.OTHER
}

export const checkFileType = (fileType: string): boolean => {
  if (fileType.includes('audio')) {
    return true
  } else if (fileType.includes('image')) {
    return true
  } else if (fileType.includes('video')) {
    return true
  } else if (fileType.includes('pdf')) {
    return true
  } else if (fileType.includes('text')) {
    return true
  } else if (fileType === 'application/vnd.android.package-archive') {
    return true
  } else if (fileType === 'application/json' || 'aplication/xml') {
    return true
  } else if (
    fileType === 'application/msword' ||
    fileType === 'application/vnd.ms-excel' ||
    fileType === 'application/vnd.ms-powerpoint' ||
    fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    fileType ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return true
  } else if (
    fileType === 'application/zip' ||
    fileType === 'application/gzip' ||
    fileType === 'application/x-rar-compressed' ||
    fileType === 'application/x-tar'
  ) {
    return true
  }

  toaster.create({ title: 'File type is not supported!', type: 'error' })
  return false
}

export const checkFileSize = (fileSize: number): boolean => {
  const size = fileSize / 1000000

  if (size <= parseInt(process.env.MAX_FILE_SIZE ?? '100')) {
    return true
  }

  return false
}
