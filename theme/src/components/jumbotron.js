/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'

const Jumbotron = ({ children }) => (
  <Styled.div
    sx={{
      alignItems: 'center',
      backgroundColor: 'primary',
      backgroundImage: 'url(/images/trianglify.svg)',
      backgroundPosition: 'top',
      backgroundSize: 'cover',
      width: '100%'
    }}
  >
    <div
      sx={{
        color: 'white',
        py: 4
      }}
    >
      {children}
    </div>
    <SwoopBottom />
  </Styled.div>
)

Jumbotron.propTypes = {
  children: PropTypes.node.isRequired
}

export default Jumbotron
