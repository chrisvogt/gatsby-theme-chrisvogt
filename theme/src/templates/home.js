/** @jsx jsx */
import { jsx, Flex, Styled } from 'theme-ui'

import Footer from '../components/footer'
import GitHub from '../components/widgets/github'
import Goodreads from '../components/widgets/goodreads'
import Header from '../components/header'
import Instagram from '../components/widgets/instagram'
import Layout from '../components/layout'
import Posts from '../components/widgets/posts'

import useSiteMetadata from '../hooks/use-site-metadata'
import { getHeadline, getSubhead } from '../selectors/metadata'

export default () => {
  const siteMetadata = useSiteMetadata()
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout>
      <Header>
        <div
          sx={{
            display: [`block`, ``, `grid`],
            gridGap: 0,
            gridTemplateColumns: [``, ``, `1fr 60%`],
            width: `100%`
          }}
        >
          <Flex
            sx={{
              flexDirection: `column`,
              alignItems: [`center`, ``, `flex-end`]
            }}
          >
            <img
              sx={{
                borderColor: `white`,
                borderRadius: `50%`,
                borderStyle: `solid`,
                borderWidth: 3,
                mr: [0, 0, 3]
              }}
              alt='Avatar'
              src='https://www.chrisvogt.me/assets/images/avatar-512px.jpg'
              height='128'
              width='128'
            />
          </Flex>
          <Flex
            sx={{
              textAlign: [`center`, ``, `left`],
              flexDirection: `column`,
              justifyContent: `center`
            }}
          >
            <Styled.h1 sx={{ mb: 0 }}>{headline}</Styled.h1>
            <Styled.p sx={{ py: 0, my: 0, fontSize: 2 }}>{subhead}</Styled.p>
          </Flex>
        </div>
      </Header>

      <div
        sx={{
          backgroundColor: `colors.background`,
          py: 4
        }}
      >
        <Posts />
      </div>

      <GitHub />

      <div
        sx={{
          backgroundColor: `colors.background`,
          minHeight: `500px`,
          py: 3
        }}
      >
        <Instagram />
        <Goodreads />
      </div>

      <Footer />
    </Layout>
  )
}
