/** @jsx jsx */
import { Box, Container, Flex, Grid, jsx } from 'theme-ui'
import { useRef } from 'react'
import Lottie from 'lottie-react-web'

import Layout from '../components/layout'

const options = Object.freeze({
  animationData: require('../../assets/astronaut.json'),
  autoplay: true,
  loop: true
})

const NotFoundPage = () => {
  const ref = useRef()
  return (
    <Layout>
      <Flex sx={{ flex: 1 }}>
        <Container>
          <Grid
            gap={4}
            sx={{ gridTemplateColumns: [`auto`, `auto`, `1fr 70%`] }}
          >
            <Box>
              <Lottie
                key='$floatingAstronaut'
                ref={ref}
                height='50vh'
                options={options}
              />
            </Box>
            <Box
              sx={{
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `center`,
                textAlign: [`center`, `center`, `left`]
              }}
            >
              <h1 sx={{ my: 0 }}>404</h1>
              <p>
                Lost in space? Why not go{' '}
                <a title='Home page' href='/'>
                  home
                </a>
                .
              </p>
            </Box>
          </Grid>
        </Container>
      </Flex>
    </Layout>
  )
}

export default NotFoundPage
