/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './swoops/swoop-bottom'
import trianglify from './artwork/trianglify.svg'

/**
 * Header
 *
 * A decorative masthead element that can be used across page layouts.
 */
const Header = ({ children, hideTopPadding, showSwoop, styles }) => {
  return (
    <header
      role='banner'
      sx={{
        // variant: `styles.Header`,
        // background: `url(${trianglify})`,
        // backgroundSize: `cover`,
        // backgroundPosition: `bottom center`
      }}
    >
      <div
        sx={{
          pt: hideTopPadding ? 0 : 5,
          ...(styles ? styles : {})
        }}
      >
        {children}
      </div>
      {showSwoop && <SwoopBottom />}
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  showSwoop: PropTypes.bool
}

Header.defaultProps = {
  showSwoop: false
}

export default Header
