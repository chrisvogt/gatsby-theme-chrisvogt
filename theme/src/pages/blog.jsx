/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
// import { Container } from "semantic-ui-react"

// import Container from "../components/container"
// import Rotator from "../components/rotator"

// import logo from "../assets/monogram.svg"
// import { sizes } from "../gatsby-plugin-theme-ui"
// import FooterLinks from "../components/shared/footer-links"

export default () => (
  <>
    <Helmet>
      <title>Blog Posts</title>
      <meta name='description' content='Recent articles from my blog.' />
    </Helmet>
    <Container>
      <p>Test</p>
    </Container>
  </>
)
