/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const CardFooter = ({ children }) => (
  <div
    sx={{
      variant: `styles.GitHubCardFooter`
    }}
  >
    {children}
  </div>
)

CardFooter.propTypes = {
  children: PropTypes.node.isRequired
}

export default CardFooter
