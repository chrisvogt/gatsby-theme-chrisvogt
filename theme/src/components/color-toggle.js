import React from 'react'
import { DarkModeToggle } from 'react-dark-mode-toggle-2'
import { useColorMode } from 'theme-ui'
import isDarkMode from '../helpers/isDarkMode'

export default () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <DarkModeToggle
      onChange={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      isDarkMode={isDarkMode(colorMode)}
      checked={colorMode === 'dark'}
      size={80}
    />
  )
}
