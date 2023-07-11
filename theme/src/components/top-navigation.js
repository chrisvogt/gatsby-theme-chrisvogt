/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { Link } from 'gatsby'

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
const TopNavigation = ({ hideBackground, hideMenuItems }) => {
  const metadata = useSiteMetadata()

  const navigation = useNavigationData()
  const menuItems = getHeaderLeftItems(navigation)
  const title = getTitle(metadata)

  return (
    <div
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
        <div sx={{ flexGrow: 1 }}>
          <Link
            to='/'
            sx={{
              variant: 'styles.a',
              color: `light`,
              display: [`block`, ``, `inline`],
              fontFamily: `heading`,
              fontSize: 2,
              fontWeight: 500,
              letterSpacing: '1.1px',
              marginRight: 3,
              textDecoration: `none`
            }}
          >
            {title}
          </Link>

          {!hideMenuItems &&
            menuItems.map(({ slug, path, title, text }) => (
              <Link key={slug} sx={{ variant: 'styles.a', color: `light`, mr: 3 }} title={title} to={path}>
                {text}
              </Link>
            ))}
        </div>

        <ColorToggle />
      </Container>
    </div>
  )
}

export default TopNavigation
