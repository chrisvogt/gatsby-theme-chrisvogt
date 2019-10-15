/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { getTitle } from '../selectors/metadata'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

export default () => {
  const { header: { left: menuItems } = {} } = useNavigationData()
  const metadata = useSiteMetadata()
  const title = getTitle(metadata)

  return (
    <Styled.div
      sx={{
        backgroundColor: `white`
      }}
    >
      <Container
        sx={{
          py: 3,
          textAlign: [`center`, ``, `left`]
        }}
      >
        <Link
          to='/'
          sx={{
            color: `colors.dark`,
            display: [`block`, ``, `inline`],
            fontFamily: `heading`,
            fontSize: 2,
            fontWeight: `bold`,
            textDecoration: `none`,
            marginRight: 3
          }}
        >
          {title}
        </Link>

        {menuItems &&
          menuItems.map(({ slug, path, title, text }) => (
            <Styled.a key={slug} href={path} title={title} sx={{ mr: 3 }}>
              {text}
            </Styled.a>
          ))}
      </Container>
    </Styled.div>
  )
}
