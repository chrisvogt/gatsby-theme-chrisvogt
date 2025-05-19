import React from 'react'
import { useColorMode } from 'theme-ui'
import isDarkMode from '../helpers/isDarkMode'
import loadable from '@loadable/component'

const DarkModeToggle = loadable(
  () => import('react-dark-mode-toggle-2').then(mod => ({ default: mod.DarkModeToggle })),
  { ssr: false }
)

export default () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <DarkModeToggle
      id='color-mode-toggle'
      attributes={{
        'aria-label': `Set color mode to ${colorMode === 'default' ? 'dark' : 'light'}`
      }}
      onChange={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      isDarkMode={isDarkMode(colorMode)}
      checked={colorMode === 'dark'}
      size={70}
    />
  )
}
