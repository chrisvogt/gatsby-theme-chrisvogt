/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { graphql } from 'gatsby'

import Category from '../components/category'
import Layout from '../components/layout'
import PageHeader from '../components/blog/page-header'
import Seo from '../components/seo'

import SoundCloud from '../shortcodes/soundcloud'
import YouTube from '../shortcodes/youtube'

const getBanner = mdx => mdx.frontmatter.banner
const getDescription = mdx => mdx.frontmatter.description
const getTitle = mdx => mdx.frontmatter.title

const MediaTemplate = ({ data: { mdx }, children }) => {
  const category = mdx.fields.category?.replace('photography/', '').replace('music/', '')
  const date = mdx.frontmatter.date
  const soundcloudId = mdx.frontmatter.soundcloudId
  const title = getTitle(mdx)
  const youtubeSrc = mdx.frontmatter.youtubeSrc

  return (
    <Layout>
      {(youtubeSrc || soundcloudId) && (
        <Themed.div
          sx={{
            background: theme => theme.colors['panel-background'],
            textAlign: `center`,
            paddingY: 3,
            position: `relative`
          }}
        >
          <Container>
            {youtubeSrc && <YouTube url={youtubeSrc} />}
            {soundcloudId && <SoundCloud soundcloudId={soundcloudId} />}
          </Container>
        </Themed.div>
      )}

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3,
          position: 'relative'
        }}
      >
        <Container sx={{ width: ['', 'max(80ch, 50vw)'], lineHeight: 1.7 }}>
          <article className='h-entry'>
            {category && (
              <Category type={category} sx={{ mb: 2 }} />
            ) }

            <PageHeader>
              {title}
            </PageHeader>

            <time className='dt-published created'>
              Published {date}
            </time>

            <div className='e-content article-content'>
              {children}
            </div>
          </article>
        </Container>
      </Flex>
    </Layout>
  )
}

export const Head = ({ data: { mdx } }) => {
  const banner = getBanner(mdx)
  const description = getDescription(mdx)
  const title = getTitle(mdx)

  return (
    <Seo
      article={true}
      description={description}
      image={banner}
      title={title}
    />
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      body
      fields {
        category
      }
      frontmatter {
        banner
        date(formatString: "MMMM DD, YYYY")
        description
        title
        type
        soundcloudId
        youtubeSrc
      }
    }
  }
`

export default MediaTemplate
