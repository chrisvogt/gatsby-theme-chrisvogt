/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'

import { defaultBoxShadow } from '../../../gatsby-plugin-theme-ui/styles'
import { getInstagramUsername } from '../../../selectors/metadata'
import useInstagramPosts from '../../../hooks/use-instagram-posts'
import useSiteMetadata from '../../../hooks/use-site-metadata'

export default () => {
  const { isLoading, posts } = useInstagramPosts()
  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)

  return (
    <Container id='instagram' sx={{ mb: 4, variant: `styles.Widget` }}>
      <Styled.h3 sx={{ variant: `styles.WidgetHeadline` }}>
        Instagram Posts
      </Styled.h3>

      <div className='gallery'>
        {isLoading && <h3>Loading...</h3>}

        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {!isLoading &&
            posts
              .filter(post => post.type === 'image')
              .slice(0, 4)
              .map(post => {
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
                    rel='noopener noreferrer'
                    sx={{
                      '&:hover, &:focus': { boxShadow: defaultBoxShadow }
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
        </div>
        <div sx={{ marginTop: 4, variant: `styles.WidgetFooter` }}>
          <Styled.a href={`https://www.instagram.com/${instagramUsername}`}>
            View Instagram profile &raquo;
          </Styled.a>
        </div>
      </div>
    </Container>
  )
}
