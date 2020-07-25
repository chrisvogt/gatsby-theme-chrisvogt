/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const CardFooter = ({ children, customStyles }) => (
  <div
    sx={{
      variant: `styles.GitHubCardFooter`,
      ...(typeof customStyles === 'object' ? customStyles : {})
    }}
  >
    {children}
  </div>
)

CardFooter.propTypes = {
  /** The content for the card footer. */
  children: PropTypes.node.isRequired
}

export default CardFooter
