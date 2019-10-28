/** @jsx jsx */
import { Header as ThemeHeader, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import theme from '../gatsby-plugin-theme-ui'

const Header = ({ children, swoopFill, styles }) => (
  <ThemeHeader>
    <div
      sx={{
        py: 5,
        ...(styles ? styles : {})
      }}
    >
      {children}
    </div>
    <SwoopBottom fill={theme.colors.background} invert />
  </ThemeHeader>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  swoopFill: PropTypes.string
}

Header.defaultProps = {
  swoopFill: theme.colors.primary
}

export default Header
