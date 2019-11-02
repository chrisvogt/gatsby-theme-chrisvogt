/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import { getInstagramUsername } from '../../../selectors/metadata'
import useInstagramPosts from '../../../hooks/use-instagram-posts'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

export default () => {
  const { isLoading, posts } = useInstagramPosts()
  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)

  return (
    <Widget id='instagram'>
      <WidgetHeader>Instagram Posts</WidgetHeader>

      <div className='gallery'>
        {isLoading && <h3>Loading...</h3>}

        <Grid
          sx={{
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {!isLoading &&
            posts.slice(0, 4).map(post => {
              const {
                id,
                images: { standard_resolution: { height, width, url } = {} },
                link
              } = post
              return (
                <a
                  key={id}
                  href={link}
                  style={{ lineHeight: 0 }}
                  target='_blank'
                  title='View image on Instagram'
                  rel='noopener noreferrer'
                  sx={{
                    variant: `styles.InstagramCard`
                  }}
                >
                  <img
                    src={url}
                    height={height}
                    width={width}
                    alt='Instagram post thumbnail'
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </a>
              )
            })}
        </Grid>
        <CallToAction
          title={`${instagramUsername} on Instagram`}
          url={`https://www.instagram.com/${instagramUsername}`}
        >
          View Instagram profile &raquo;
        </CallToAction>
      </div>
    </Widget>
  )
}
