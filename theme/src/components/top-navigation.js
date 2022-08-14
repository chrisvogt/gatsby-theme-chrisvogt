/** @jsx jsx */
import { jsx, Container, Themed } from 'theme-ui'
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
const TopNavigation = ({ hideBackground }) => {
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
          // textAlign: [`center`, ``, `left`]
        }}
      >
        <div sx={{ flexGrow: 1 }}>
          <Themed.a
            as={Link}
            to='/'
            sx={{
              color: `light`,
              display: [`block`, ``, `inline`],
              fontFamily: `heading`,
              fontSize: 2,
              fontWeight: `bold`,
              marginRight: 3,
              textDecoration: `none`
            }}
          >
            {title}
          </Themed.a>

          {menuItems &&
            menuItems.map(({ slug, path, title, text }) => (
              <Themed.a as={Link} key={slug} sx={{ color: `light`, mr: 3 }} title={title} to={path}>
                {text}
              </Themed.a>
            ))}
        </div>

        <ColorToggle />
      </Container>
    </div>
  )
}

export default TopNavigation
