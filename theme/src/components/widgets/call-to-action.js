/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const CallToAction = ({ children, title, to, url }) => {
  const linkProps = to
    ? {
        as: Link,
        to
      }
    : {}
  return (
    <p
      sx={{
        marginBottom: `1rem`,
        marginTop: 4,
        variant: `styles.WidgetFooter`
      }}
    >
      <Styled.a
        href={url}
        sx={{ fontFamily: `heading`, fontSize: 3 }}
        title={title}
        {...linkProps}
      >
        {children}
      </Styled.a>
    </p>
  )
}

CallToAction.propTypes = {
  /** Content to render within the call to action container. */
  children: PropTypes.node.isRequired,
  /** The title attribute for the hyperlink. */
  title: PropTypes.string.isRequired,
  /** A destination for Gatsby router navigation. */
  to: PropTypes.string,
  /** A URL for hyperlink navigation. */
  url: PropTypes.string
}

export default CallToAction
