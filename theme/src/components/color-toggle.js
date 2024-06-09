import React from 'react'
import { DarkModeToggle } from 'react-dark-mode-toggle-2'
import { useColorMode } from 'theme-ui'
import isDarkMode from '../helpers/isDarkMode'

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
