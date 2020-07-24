import React from 'react'
import { useColorMode } from 'theme-ui'

export default props => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <label
      sx={{
        position: `relative`,
        display: `inline-block`,
        width: `40px`,
        height: `20px`,
        backgroundColor: `#eee`,
        borderRadius: `20px`,
        '&::after': {
          content: ``,
          position: `absolute`,
          width: `18px`,
          height: `18px`,
          borderRadius: `50%`,
          backgroundColor: `white`,
          top: `1px`,
          left: `1px`,
          transition: `all 0.3s`
        }
      }}
      onClick={e => {
        setColorMode(colorMode === 'default' ? 'dark' : 'default')
      }}
    >
      <input type='checkbox' />
      <span className='slider round'></span>
    </label>
  )
}
