import React from 'react'
import { Container, Flex } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

import Footer from 'gatsby-theme-chrisvogt/src/components/footer'
import Layout from 'gatsby-theme-chrisvogt/src/components/layout'
import Seo from 'gatsby-theme-chrisvogt/src/components/seo'

const PrivacyPolicy = () => (
  <Layout>
    <Seo title='Privacy Policy' />

    <Flex
      sx={{
        backgroundColor: `colors.background`,
        flexDirection: `column`,
        flexGrow: 1,
        py: 3
      }}
    >
      <Container>
        <Themed.h1>
          Privacy Policy
        </Themed.h1>

        <Themed.p>
          This privacy policy outlines how my personal website, www.chrisvogt.me, collects and uses data made available
          by accessing the site.
        </Themed.p>

        <Themed.h2>
          Third Parties
        </Themed.h2>

        <Themed.p>
          This website uses Google Analytics to page view, impression, and interaction events. This is done for personal
          use to help guide the layout and content of the site. I collect and review this data to learn more about:
        </Themed.p>

        <Themed.ul>
          <li>Who visits the website.</li>
          <li>How the website is used.</li>
          <li>Whether visitors return to the website or not.</li>
          <li>What content, design, and features are engaging and what aren't.</li>
        </Themed.ul>

        <Themed.p>
          Please review{' '}
          <em>
            <a href='https://policies.google.com/privacy' title='Google Privacy & Terms'>
              Google Privacy & Terms
            </a>
          </em>{' '}
          to learn more about the Google Analytics data collection policies and practices.
        </Themed.p>

        <div>
          <em>Last updated June 29, 2020</em>
        </div>
      </Container>
    </Flex>
    <Footer />
  </Layout>
)

export default PrivacyPolicy
