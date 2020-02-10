/** @jsx jsx */
import { Header as ThemeHeader, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import theme from '../gatsby-plugin-theme-ui'
const trianglify = require('./artwork/trianglify.svg')

const Header = ({
  children,
  hideBackground,
  hideTopPadding,
  showSwoop,
  swoopFill,
  styles
}) => (
  <ThemeHeader sx={{ background: hideBackground ? '' : `url(${trianglify})` }}>
    <div
      sx={{
        pt: hideTopPadding ? 0 : 5,
        pb: 5,
        ...(styles ? styles : {})
      }}
    >
      {children}
    </div>
    {showSwoop && <SwoopBottom fill={swoopFill} invert />}
  </ThemeHeader>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  showSwoop: PropTypes.bool,
  swoopFill: PropTypes.string
}

Header.defaultProps = {
  showSwoop: false,
  swoopFill: theme.colors.background
}

export default Header
