/** @jsx jsx */
import { Container, Flex, jsx, Themed, useThemeUI } from 'theme-ui'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import isDarkMode from '../helpers/isDarkMode'

import Layout from '../components/layout'
import SEO from '../components/seo'

import SoundCloud from '../shortcodes/soundcloud'
import YouTube from '../shortcodes/youtube'

const MediaTemplate = ({ data }) => {
  const { colorMode } = useThemeUI()
  const { mdx } = data

  const banner = mdx.frontmatter.banner
  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const description = mdx.frontmatter.description
  const title = mdx.frontmatter.title

  const youtubeSrc = mdx.frontmatter.youtubeSrc
  const soundcloudId = mdx.frontmatter.soundcloudId

  return (
    <Layout>
      <SEO
        article={true}
        description={description}
        image={banner}
        title={title}
      />

      {(youtubeSrc || soundcloudId) && (
        <div
          sx={{
            backgroundColor: `var(--theme-ui-colors-panel-background)`,
            textAlign: `center`,
            paddingY: 3
          }}
        >
          <Container>
            {youtubeSrc && <YouTube url={youtubeSrc} />}
            {soundcloudId && <SoundCloud soundcloudId={soundcloudId} />}
          </Container>
        </div>
      )}

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ height: `100%` }}>
          {category && <div sx={{ variant: `text.title` }}>{category}</div>}

          <time className='created'>{date}</time>

          <Themed.h1 as={Heading}>{title}</Themed.h1>

          <div className='article-content'>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </Container>
      </Flex>
    </Layout>
  )
}

MediaTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
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
