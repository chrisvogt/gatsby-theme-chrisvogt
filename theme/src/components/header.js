/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import theme from '../gatsby-plugin-theme-ui'
import trianglify from './artwork/trianglify.svg'
// const trianglify = require('./artwork/trianglify.svg')

/**
 * Header
 *
 * A decorative masthead element.
 */
const Header = ({ children, hideTopPadding, showSwoop, styles }) => (
  <div
    sx={{
      variant: `styles.Header`,
      background: `url(${trianglify})`,
      backgroundSize: `cover`,
      backgroundPosition: `bottom center`
    }}
  >
    <div
      sx={{
        pt: hideTopPadding ? 0 : 5,
        pb: 5,
        ...(styles ? styles : {})
      }}
    >
      {children}
    </div>
    {showSwoop && <SwoopBottom fill={theme.colors.background} invert />}
  </div>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  showSwoop: PropTypes.bool
}

Header.defaultProps = {
  showSwoop: false
}

export default Header
