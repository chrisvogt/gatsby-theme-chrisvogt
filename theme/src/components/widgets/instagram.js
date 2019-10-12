/** @jsx jsx */
import { jsx, Container } from 'theme-ui'

import useInstagramPosts from '../../hooks/use-instagram-posts'

export default () => {
  const { isLoading, posts } = useInstagramPosts()

  return (
    <Container
      id='instagram'
      sx={{
        backgroundColor: '#f8f9fa',
        mb: 4
      }}
    >
      <h3
        sx={{
          backgroundColor: 'white',
          mt: 0,
          mb: 4,
          padding: 3
        }}
      >
        Instagram Posts
      </h3>

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
                  images: { low_resolution: { height, width, url } = {} },
                  link
                } = post

                return (
                  <a
                    key={id}
                    href={link}
                    style={{ lineHeight: 0 }}
                    target='_blank'
                    rel='noopener noreferrer'
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
      </div>
    </Container>
  )
}
