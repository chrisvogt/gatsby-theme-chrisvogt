/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid, Heading } from '@theme-ui/components'

import useRecentPosts from '../../../hooks/use-recent-posts'

import CallToAction from '../call-to-action'
import PostCard from './post-card'
import Widget from '../widget'

export default () => {
  const posts = useRecentPosts()
  const getColumnCount = postsCount => {
    let columnCount
    switch (postsCount) {
      case 1:
        columnCount = 1
        break
      case 2:
        columnCount = 2
        break
      default:
        columnCount = 3
    }
    return columnCount
  }
  return (
    <Widget id='posts'>
      <Heading sx={{ variant: `styles.WidgetHeadline` }}>Blog</Heading>
      <div sx={{ width: `100%` }}>
        <Grid
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: '1rem',
            gridTemplateColumns: [
              ``,
              ``,
              `repeat(${getColumnCount(posts.length)}, 1fr)`
            ]
          }}
        >
          {posts.map(post => (
            <PostCard
              category={post.fields.category}
              date={post.frontmatter.date}
              excerpt={post.excerpt}
              key={post.fields.id}
              link={post.fields.slug}
              title={post.frontmatter.title}
              banner={post.frontmatter.banner}
            />
          ))}
        </Grid>
      </div>
      <CallToAction title='View all blog posts' to='/blog'>
        Blog posts &rarr;
      </CallToAction>
    </Widget>
  )
}
