/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { Fragment, useRef } from 'react'
import Lottie from 'lottie-react-web'

const options = Object.freeze({
  animationData: require('../../assets/astronaout.json'),
  autoplay: true,
  loop: true
})

const NotFoundPage = () => {
  const ref = useRef()
  return (
    <Fragment>
      <div></div>
      <Container>
        <div sx={{ textAlign: `center` }}>
          <Lottie
            key='$floatingAstronaut'
            ref={ref}
            height='250px'
            options={options}
          />
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
    </Fragment>
  )
}

export default NotFoundPage
