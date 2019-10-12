/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Footer from '../components/footer'
import GitHub from '../components/github'
import Instagram from '../components/widgets/instagram'
import Jumbotron from '../components/jumbotron'
import Layout from '../components/layout'
import Panel from '../components/panel'
import Posts from '../components/posts'

export default () => (
  <Layout>
    <Jumbotron>
      <div
        sx={{
          display: ['block', 'grid'],
          gridGap: 0,
          gridTemplateColumns: ['', '1fr 60%'],
          width: '100%'
        }}
      >
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: ['center', 'flex-end']
          }}
        >
          <img
            sx={{
              borderColor: 'white',
              borderRadius: '50%',
              borderStyle: 'solid',
              borderWidth: 3,
              mr: [0, 3]
            }}
            alt="Avatar"
            src="https://www.chrisvogt.me/assets/images/avatar-512px.jpg"
            height="128"
            width="128"
          />
        </div>
        <div
          sx={{
            textAlign: ['center', 'left']
          }}
        >
          <Styled.h1 sx={{ mb: 0 }}>Chris Vogt</Styled.h1>
          <Styled.h4 sx={{ py: 0, my: 0, fontSize: 3 }}>
            Software Engineer in San Francisco
          </Styled.h4>
        </div>
      </div>
    </Jumbotron>

    <Panel />

    <GitHub />

    <div
      sx={{
        minHeight: '500px',
        py: 3
      }}
    >
      <Posts />

      <Instagram />
    </div>

    <Footer />
  </Layout>
)
