import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { FiFile } from 'react-icons/fi'
import { FILE_TYPE, getFileType } from '@/utilities/file.function'
import {
  FaRegFileAudio,
  FaRegFileImage,
  FaRegFilePdf,
  FaRegFileVideo,
} from 'react-icons/fa'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const key = searchParams.get('key') ?? ''

  const origin = req.nextUrl.origin

  const res = await fetch(`${origin}/${key}`, {
    method: 'GET',
    headers: {
      authorization: `Basic ${process.env.API_KEY}`,
    },
  })

  if (key.length <= 0) {
    return new ImageResponse(<OgImage origin={origin} />, {
      width: 854,
      height: 480,
    })
  }

  if (res.status === 200) {
    const headers = res.headers
    const type = headers.get('content-type') ?? ''
    const name = headers.get('content-disposition') ?? ''

    return new ImageResponse(
      <OgImage origin={origin} name={name} type={type} />,
      {
        width: 854,
        height: 480,
      }
    )
  }

  return new ImageResponse(
    <OgImage origin={origin} name="Not found" type="none" />,
    {
      width: 854,
      height: 480,
    }
  )
}

const OgImage = ({
  origin,
  name,
  type,
}: {
  origin: string
  name?: string
  type?: string
}) => {
  const getIconType = (type: string) => {
    const color = 'rgba(255, 255, 255, 0.7)'
    const size = 30

    if (type === 'none') {
      return <FiFile color={color} size={size} />
    }

    const fileType = getFileType(type)

    switch (fileType) {
      case FILE_TYPE.AUDIO:
        return <FaRegFileAudio color={color} size={size} />
      case FILE_TYPE.IMAGE:
        return <FaRegFileImage color={color} size={size} />
      case FILE_TYPE.PDF:
        return <FaRegFilePdf color={color} size={size} />
      case FILE_TYPE.VIDEO:
        return <FaRegFileVideo color={color} size={size} />
      case FILE_TYPE.OTHER:
        return <FiFile color={color} size={size} />
    }
  }

  const fileIcon = type ? getIconType(type) : <></>

  return (
    <div
      style={{
        width: 854,
        height: 480,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
      }}
    >
      <img
        src={`${origin}/logo.png`}
        width="150px"
        height="150px"
        alt="Profile Picture"
      />

      <div
        style={{
          position: 'absolute',
          bottom: '55px',
          right: '40px',
          fontWeight: 'bold',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 20,
        }}
      >
        titipfile
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {fileIcon && fileIcon}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 18,
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: 0,
            }}
          >
            {type}
          </div>
        </div>
      </div>
    </div>
  )
}
