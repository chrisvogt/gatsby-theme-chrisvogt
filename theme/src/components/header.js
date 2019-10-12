/** @jsx jsx */
import { Header as ThemeHeader, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'

const Header = ({ children }) => (
  <ThemeHeader>
    <div
      sx={{
        py: 4
      }}
    >
      {children}
    </div>
    <SwoopBottom />
  </ThemeHeader>
)

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header
