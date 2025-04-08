import { createSystem, defaultConfig, defineStyle } from '@chakra-ui/react'

const system = createSystem(defaultConfig, {
  globalCss: {
    'html, body': {
      backgroundColor: 'gray.100',
    },
  },
})

export const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
})

export default system
