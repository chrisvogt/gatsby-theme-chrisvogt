/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { getHeaderLeftItems } from '../selectors/navigation'
import { getTitle } from '../selectors/metadata'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

const trianglify = require('./artwork/trianglify.svg')

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
          py: 3,
          textAlign: [`center`, ``, `left`]
        }}
      >
        <Styled.a
          as={Link}
          to='/'
          sx={{
            color: `light`,
            display: [`block`, ``, `inline`],
            fontFamily: `heading`,
            fontSize: 2,
            fontWeight: `bold`,
            textDecoration: `none`,
            marginRight: 3
          }}
        >
          {title}
        </Styled.a>

        {menuItems &&
          menuItems.map(({ slug, path, title, text }) => (
            <Styled.a
              as={Link}
              key={slug}
              to={path}
              title={title}
              sx={{ color: `light`, mr: 3 }}
            >
              {text}
            </Styled.a>
          ))}
      </Container>
    </div>
  )
}

export default TopNavigation
