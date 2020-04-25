/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import { getInstagramUsername } from '../../../selectors/metadata'
import useInstagramPosts from '../../../hooks/use-instagram-posts'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import LazyLoad from '../../lazy-load'
import Widget from '../widget'
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
      View profile &rarr;
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
            posts.slice(0, 4).map(post => {
              const {
                id,
                images: { standard_resolution: { height, width, url } = {} },
                link
              } = post
              return (
                <Styled.a
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
                  <LazyLoad>
                    <img
                      crossOrigin='anonymous'
                      src={url}
                      height={height}
                      width={width}
                      alt='Instagram post'
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </LazyLoad>
                </Styled.a>
              )
            })}
        </Grid>
      </div>
    </Widget>
  )
}
