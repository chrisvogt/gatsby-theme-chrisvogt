/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './swoops/swoop-bottom'
// import trianglify from './artwork/trianglify.svg'

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

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header
