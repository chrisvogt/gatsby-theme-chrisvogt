/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { useRef } from 'react'
import Lottie from 'lottie-react-web'

import Footer from '../components/footer'
import Layout from '../components/layout'

const options = Object.freeze({
  animationData: require('../../assets/astronaout.json'),
  autoplay: true,
  loop: true
})

const NotFoundPage = () => {
  const ref = useRef()
  return (
    <Layout>
      <Container>
        <Lottie
          key='$floatingAstronaut'
          ref={ref}
          height='50vh'
          options={options}
        />
        <div sx={{ textAlign: `center` }}>
          <h1>404</h1>
          <p>
            Lost in space? Why not go{' '}
            <a title='Home page' href='/'>
              home
            </a>
            .
          </p>
        </div>
      </Container>
      <Footer />
    </Layout>
  )
}

export default NotFoundPage
