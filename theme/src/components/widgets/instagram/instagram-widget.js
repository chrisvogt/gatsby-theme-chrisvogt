/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import { getInstagramUsername } from '../../../selectors/metadata'
import useInstagramPosts from '../../../hooks/use-instagram-posts'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import Widget from '../widget'
import WidgetItem from './instagram-widget-item'
import WidgetHeader from '../widget-header'

export default () => {
  const { isLoading, posts } = useInstagramPosts()
  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)

  const callToAction = (
    <CallToAction
      title={`${instagramUsername} on Instagram`}
      url={`https://www.instagram.com/${instagramUsername}`}
    >
      View profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='instagram'>
      <WidgetHeader aside={callToAction}>Instagram</WidgetHeader>

      <div className='gallery'>
        {isLoading && <h3>Loading...</h3>}

        <Grid
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {!isLoading &&
            posts.slice(0, 4).map(post => <WidgetItem post={post} />)}
        </Grid>
      </div>
    </Widget>
  )
}
