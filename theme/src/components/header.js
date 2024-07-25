/** @jsx jsx */
import { jsx } from 'theme-ui'
import SwoopBottom from './swoops/swoop-bottom'

/**
 * Header
 *
 * A decorative masthead element that can be used across page layouts.
 */
const Header = ({ children, styles }) => {
  return (
    <header
      role='banner'
      sx={{
        position: 'relative',
        variant: `styles.Header`
      }}
    >
      <div
        sx={{
          ...(styles ? styles : {})
        }}
      >
        {children}
      </div>
    </header>
  )
}

export default Header
