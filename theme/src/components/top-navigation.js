/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { getTitle } from '../selectors/metadata'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

export default () => {
  const { header: { left } = {} } = useNavigationData()
  const metadata = useSiteMetadata()
  const title = getTitle(metadata)

  return (
    <Styled.div
      sx={{
        backgroundColor: `white`
      }}
    >
      <Container sx={{ py: 3 }}>
        <Link
          to='/'
          sx={{
            fontWeight: `bold`,
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
