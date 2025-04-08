import { createIcon, Icon } from '@chakra-ui/react'
import { Dispatch, JSX, SetStateAction } from 'react'

export const CircleButton = ({
  index,
  currentPage,
  activeIcon,
  setCurrent,
}: {
  index: number
  currentPage: number
  activeIcon: JSX.Element
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  const active = currentPage === index

  const color = 'blackAlpha.400'
  const colorActive = 'blackAlpha.800'
  const colorHover = 'blackAlpha.600'

  return (
    <>
      {active ? (
        <Icon
          boxSize={[4, 5]}
          color={active ? colorActive : color}
          _hover={{
            cursor: 'pointer',
            color: active ? colorActive : colorHover,
          }}
          onClick={() => setCurrent(index)}
          data-state="open"
          _open={{
            animationName: 'fade-in, scale-out',
            animationDuration: '600ms',
          }}
          _closed={{
            animationName: 'fade-out, scale-in',
            animationDuration: '200ms',
          }}
        >
          {activeIcon}
        </Icon>
      ) : (
        <CircleIcon
          boxSize={[4, 5]}
          viewBox="0 0 200 200"
          color={active ? colorActive : color}
          _hover={{
            cursor: 'pointer',
            color: active ? colorActive : colorHover,
          }}
          onClick={() => setCurrent(index)}
        />
      )}
    </>
  )
}

const CircleIcon = createIcon({
  displayName: 'CicleIcon',
  path: (
    <>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </>
  ),
})
