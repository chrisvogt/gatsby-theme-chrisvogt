/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Panel from '../components/panel'
import GitHub from '../components/github'
import Jumbotron from '../components/jumbotron'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <Jumbotron>
      <Styled.div sx={{
        display: 'grid',
        gridGap: 0,
        gridTemplateColumns: '1fr 50%',
        width: '100%'
      }}>
        <div sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <Styled.img sx={{
            borderColor: 'white',
            borderRadius: '50%',
            borderStyle: 'solid',
            borderWidth: 3
          }}
            alt='Chris Vogt Avatar'
            src='https://www.chrisvogt.me/assets/images/avatar-512px.jpg'
            height='128'
            width='128'
          />
        </div>
        <div>
          <Styled.h1>Home Page</Styled.h1>
          <Styled.h2>Cool subheader about site</Styled.h2>
        </div>
      </Styled.div>
    </Jumbotron>
    Home layout test
    <Panel />
    <GitHub />
  </Layout>
)
