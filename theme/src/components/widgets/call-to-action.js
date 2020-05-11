/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
 * Call To Action
 *
 * Each widget contains a call to action next to its headline. For most Private
 * Sphere social widgets, I render a 'View profile' call to action.
 */
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
  /** Content rendered within the call to action container. */
  children: PropTypes.node.isRequired,
  /** The title attribute for the hyperlink. */
  title: PropTypes.string.isRequired,
  /** Use instead of href to define a Gatsby router destination. */
  to: PropTypes.string,
  /** The URL for the hyperlink's navigation. */
  url: PropTypes.string
}

export default CallToAction
