import React from 'react'
import { useColorMode } from 'theme-ui'

export default props => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <button
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}
      >
        Toggle {colorMode === 'default' ? 'dark' : 'light'}
      </button>
    </header>
  )
}
