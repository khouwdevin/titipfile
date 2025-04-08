import { FILE_TYPE, getFileType } from '@/utilities/file.function'
import {
  FaRegFileAudio,
  FaRegFileImage,
  FaRegFilePdf,
  FaRegFileVideo,
} from 'react-icons/fa'
import { FiFile } from 'react-icons/fi'

export const getIconType = (type: string) => {
  const fileType = getFileType(type)
  switch (fileType) {
    case FILE_TYPE.AUDIO:
      return <FaRegFileAudio />
    case FILE_TYPE.IMAGE:
      return <FaRegFileImage />
    case FILE_TYPE.PDF:
      return <FaRegFilePdf />
    case FILE_TYPE.VIDEO:
      return <FaRegFileVideo />
    case FILE_TYPE.OTHER:
      return <FiFile />
  }
}
