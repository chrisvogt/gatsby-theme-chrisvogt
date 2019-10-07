/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import PropTypes from 'prop-types'

const Jumbotron =  ({ children }) => (
  <Styled.div sx={ {
    h1: {
      fontSize: 5,
      variant: 'text.heading'
    },
    display: 'flex',
    py: 5,
    px: 3,
    alignItems: 'center',
    backgroundColor: 'primary',
    minHeight: '15em',
    width: '100%',
    variant: 'styles.header'
  } }>
    {children}
  </Styled.div>
)

Jumbotron.propTypes = {
  children: PropTypes.node.isRequired
}

export default Jumbotron
