/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { getTitle } from '../selectors/metadata'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

import Container from './container'

export default () => {
  const { header: { left } = {} } = useNavigationData()
  const metadata = useSiteMetadata()
  const title = getTitle(metadata)

  return (
    <Styled.div
      sx={{
        backgroundColor: 'white',
        py: 2,
        px: 3
      }}
    >
      <Container>
        <Link
          to="/"
          sx={{
            fontWeight: 'bold',
            marginRight: 3
          }}
        >
          {title}
        </Link>

        {left &&
          left.map(item => <Styled.a key={item.slug}>{item.text} </Styled.a>)}
      </Container>
    </Styled.div>
  )
}
