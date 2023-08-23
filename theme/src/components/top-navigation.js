/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Themed } from '@theme-ui/mdx'

import ColorToggle from '../components/color-toggle'
import { getHeaderLeftItems } from '../selectors/navigation'
import { getTitle } from '../selectors/metadata'
import trianglify from './artwork/trianglify.svg'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

/**
 * Header Navigation
 *
 * Top navigation component for the page.
 */
const TopNavigation = ({
  hideBackground,
  hideBrandLink,
  hideMenuItems
}) => {
  const metadata = useSiteMetadata()

  const navigation = useNavigationData()
  const menuItems = getHeaderLeftItems(navigation)
  const title = getTitle(metadata)

  return (
    <Themed.div
      sx={{
        background: hideBackground ? 'none' : `url(${trianglify})`,
        variant: `styles.TopNavigation`
      }}
    >
      <Container
        sx={{
          display: `flex`,
          alignItems: `center`,
          py: 3
        }}
      >
        <Themed.div sx={{ flexGrow: 1 }}>
          {!hideBrandLink &&
            <Link
            to='/'
            sx={{
              variant: 'styles.a',
              color: `light`,
              display: [`block`, ``, `inline`],
              fontFamily: `heading`,
              fontSize: [2, 3],
              fontWeight: 500,
              letterSpacing: '1.1px',
              marginRight: 3,
              textDecoration: `none`
            }}
          >
            {title}
          </Link>
          }

          {!hideMenuItems &&
            menuItems.map(({ slug, path, title, text }) => (
              <Link key={slug} sx={{ fontSize: 2, variant: 'styles.a', color: `light`, mr: 3 }} title={title} to={path}>
                {text}
              </Link>
            ))}
        </Themed.div>

        <ColorToggle />
      </Container>
    </Themed.div>
  )
}

TopNavigation.propTypes = {
  hideBackground: PropTypes.bool,
  hideBrandLink: PropTypes.bool,
  hideMenuItems: PropTypes.bool
}

export default TopNavigation
