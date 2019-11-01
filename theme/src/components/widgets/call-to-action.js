/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'

const CallToAction = ({ children, title, url }) => (
  <p sx={{ marginTop: 4, textAlign: `right` }}>
    <Styled.a
      href={url}
      sx={{ fontFamily: `heading`, fontSize: 3 }}
      title={title}
    >
      {children}
    </Styled.a>
  </p>
)

CallToAction.propTypes = {
  /** Content to render within the call to action container. */
  children: PropTypes.node.isRequired,
  /** The title attribute for the hyperlink. */
  title: PropTypes.string.isRequired,
  /** The URL for the hyperlink. */
  url: PropTypes.string.isRequired
}

export default CallToAction
