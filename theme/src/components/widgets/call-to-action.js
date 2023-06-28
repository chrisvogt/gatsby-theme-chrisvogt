/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Bars } from 'svg-loaders-react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

/**
 * Call To Action
 *
 * Each widget contains a call to action next to its headline. Can optionally render
 * a loading indicator when `isLoading` is set.
 */
const CallToAction = ({ children, isLoading, title, to, url }) => {
  const linkProps = to
    ? {
        as: Link,
        to
      }
    : {}
  return isLoading ? (
    <Bars fill='#1E90FF' width='24' height='24' sx={{ verticalAlign: `middle` }} />
  ) : (
    <Themed.a
      href={url}
      sx={{
        fontSize: 0,
        fontFamily: 'heading',
        lineHeight: '1.25', // synced with widget header
        verticalAlign: 'bottom',
        '.read-more-icon': {
          opacity: 0,
          transition: `all .3s ease`
        },
        '&:hover, &:focus': {
          textDecoration: `none`,
          transform: `translateX(150px)`
        },
        '&:hover .read-more-icon, &:focus .read-more-icon': {
          opacity: 1,
          ml: 2
        }
      }}
      title={title}
      {...linkProps}
    >
      {children}
    </Themed.a>
  )
}

CallToAction.propTypes = {
  /** Content rendered within the call to action container. */
  children: PropTypes.node.isRequired,
  /** Renders a loading indicator when true. */
  isLoading: PropTypes.bool,
  /** The title attribute for the hyperlink. */
  title: PropTypes.string.isRequired,
  /** Use instead of href to define a Gatsby router destination. */
  to: PropTypes.string,
  /** The URL for the hyperlink's navigation. */
  url: PropTypes.string
}

CallToAction.defaultProps = {
  isLoading: false
}

export default CallToAction
