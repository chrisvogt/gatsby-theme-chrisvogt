/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'

import Container from './container'
import getInstagramPosts from '../api/personal-api/getInstagramPosts'
// import useSiteMetadata from '../hooks/use-site-metadata'

export default () => {
  // const metadata = useSiteMetadata()

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const posts = await getInstagramPosts()
      setPosts(posts)
      setIsLoading(false)
    })()
  }, [])

  return (
    <Container
      id="instagram"
      background="#f8f9fa"
      sx={{
        mb: 3
      }}
    >
      <h3
        sx={{
          backgroundColor: 'white',
          mt: 0,
          mb: 3,
          padding: 3
        }}
      >
        Instagram Posts
      </h3>

      <div className="gallery">
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
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={url}
                      height={height}
                      width={width}
                      alt="Instagram post thumbnail"
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
