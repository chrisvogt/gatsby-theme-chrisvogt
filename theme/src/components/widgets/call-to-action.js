/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Bars } from 'svg-loaders-react'
import { Link } from 'gatsby'

/**
 * Call To Action
 *
 * Each widget contains a call to action next to its headline. Can optionally render
 * a loading indicator when `isLoading` is set.
 */
const CallToAction = ({ children, isLoading = false, title, to, url }) => {
  const LinkComponent = to ? Link : Themed.a
  return isLoading ? (
    <Bars fill='#1E90FF' width='24' height='24' sx={{ verticalAlign: 'middle' }} />
  ) : (
    <LinkComponent
      href={url}
      sx={{
        variant: 'styles.a',
        fontSize: 1,
        fontFamily: 'heading',
        lineHeight: '1.25', // synced with widget header
        verticalAlign: 'bottom',
        '.read-more-icon': {
          opacity: 0,
          transition: 'all .3s ease'
        },
        '&:hover, &:focus': {
          textDecoration: 'none',
          transform: 'translateX(150px)'
        },
        '&:hover .read-more-icon, &:focus .read-more-icon': {
          opacity: 1,
          ml: 2
        }
      }}
      title={title}
      to={to}
    >
      {children}
    </LinkComponent>
  )
}

export default CallToAction
