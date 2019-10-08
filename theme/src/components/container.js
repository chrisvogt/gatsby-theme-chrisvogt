/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Container = ({ background, children }) => (
  <div
    sx={{
      ...(background ? { background } : {}),
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    }}
  >
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
