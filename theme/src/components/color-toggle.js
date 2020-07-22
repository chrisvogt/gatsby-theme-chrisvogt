import React from 'react'
import { useColorMode } from 'theme-ui'

export default props => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header
      style={{ position: `fixed`, top: `10px`, left: `10px`, zIndex: `999` }}
    >
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
