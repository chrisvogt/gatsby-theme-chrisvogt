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
    <Styled.a
      href={url}
      sx={{
        fontSize: 0,
        '.read-more-icon': {
          opacity: 0,
          transition: `all .3s ease`
        },
        '&:hover': {
          textDecoration: `none`,
          transform: `translateX(150px)`
        },
        '&:hover .read-more-icon': {
          opacity: 1,
          ml: 2
        }
      }}
      title={title}
      {...linkProps}
    >
      {children}
    </Styled.a>
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
