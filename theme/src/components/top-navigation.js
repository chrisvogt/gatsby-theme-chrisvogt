/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { Link } from 'gatsby'
import { Themed } from '@theme-ui/mdx'

import ColorToggle from '../components/color-toggle'
import { getHeaderLeftItems } from '../selectors/navigation'
import { getTitle } from '../selectors/metadata'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

/**
 * Header Navigation
 *
 * Top navigation component for the page.
 */
const TopNavigation = ({ hideBrandLink, hideMenuItems }) => {
  const metadata = useSiteMetadata()

  const navigation = useNavigationData()
  const menuItems = getHeaderLeftItems(navigation)
  const title = getTitle(metadata)

  return (
    <Themed.div
      sx={{
        variant: 'styles.TopNavigation',
        minHeight: '64px'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 3
        }}
      >
        <Themed.div sx={{ flexGrow: 1 }}>
          <nav role='navigation'>
            {!hideBrandLink && (
              <Link
                to='/'
                sx={{
                  variant: 'styles.a',
                  color: 'text',
                  display: ['block', '', 'inline'],
                  fontFamily: 'heading',
                  fontSize: [2, 3],
                  fontWeight: 'bold',
                  letterSpacing: '1.1px',
                  marginRight: 3,
                  textDecoration: 'none'
                }}
              >
                {title}
              </Link>
            )}

            {!hideMenuItems &&
              menuItems.map(({ slug, path, title, text }) => (
                <Link
                  key={slug}
                  sx={{ fontSize: 2, variant: 'styles.a', color: 'text', mr: 3 }}
                  title={title}
                  to={path}
                >
                  {text}
                </Link>
              ))}
          </nav>
        </Themed.div>

        <ColorToggle />
      </Container>
    </Themed.div>
  )
}

export default TopNavigation
