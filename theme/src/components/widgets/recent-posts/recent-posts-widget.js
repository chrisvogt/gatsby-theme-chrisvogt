/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useRecentPosts from '../../../hooks/use-recent-posts'

import CallToAction from '../call-to-action'
import PostCard from './post-card'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

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

  const callToAction = (
    <CallToAction title='Browse all published content' to='/blog'>
      Browse All
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='posts' styleOverrides={{ pt: 0 }}>
      <WidgetHeader
        aside={callToAction}
        icon={faNewspaper}
      >
        Latest Posts
      </WidgetHeader>

      <div sx={{ width: `100%`, mt: 4 }}>
        <Grid
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: [3, 3, 4],
            gridTemplateColumns: [``, ``, `repeat(${getColumnCount(posts.length)}, 1fr)`]
          }}
        >
          {posts.map(post => (
            <PostCard
              banner={post.frontmatter.banner}
              category={post.fields.category}
              date={post.frontmatter.date}
              excerpt={post.excerpt}
              key={post.fields.id}
              link={post.fields.path}
              title={post.frontmatter.title}
            />
          ))}
        </Grid>
      </div>
    </Widget>
  )
}
