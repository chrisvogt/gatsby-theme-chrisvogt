import React from 'react'
import { Container, Flex } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import Layout from 'gatsby-theme-chronogrove/src/components/layout'
import Seo from 'gatsby-theme-chronogrove/src/components/seo'

const AboutPage = () => {
  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: 'column',
          flexGrow: 1,
          position: 'relative',
          py: 3
        }}
      >
        <Container sx={{ width: ['', '', 'max(80ch, 50vw)'], lineHeight: 1.7 }}>
          <Themed.h1>About Me</Themed.h1>

          <Themed.p>
            By day, I work as a software engineer at GoDaddy, creating tools that help small businesses build, grow, and
            understand their online presence. But this site isn’t about work — it’s where I follow my curiosity,
            experiment with ideas, and write code just for fun.
          </Themed.p>

          <Themed.p>
            Most evenings, you’ll find me at the piano — practicing, recording, or just playing around with sound. I’ve
            been slowly teaching myself music, and I’m figuring out how to bring what I know from tech into making
            music. I also spend a lot of time with friends in the city and love connecting with people who are
            passionate about what they do.
          </Themed.p>
        </Container>
      </Flex>
    </Layout>
  )
}

export const Head = () => <Seo title='About Me' />

export default AboutPage
