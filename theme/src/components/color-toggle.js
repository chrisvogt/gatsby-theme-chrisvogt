import React from 'react'
import { useColorMode } from 'theme-ui'
import DarkModeToggle from 'react-dark-mode-toggle'

export default () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <DarkModeToggle
      onChange={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      checked={colorMode === 'dark'}
      size={80}
    />
  )
}
