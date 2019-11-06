/** @jsx jsx */
import { Fragment } from 'react'
import { Global } from '@emotion/core'
import { jsx, Main, Styled, ThemeProvider } from 'theme-ui'

import SEO from './seo'
import TopNavigation from './top-navigation'

import theme from '../gatsby-plugin-theme-ui'

const components = {
  pre: ({ children }) => <Fragment>{children}</Fragment>
}

export default ({ children }) => (
  <ThemeProvider theme={theme} components={components}>
    <Styled.root data-testid='theme-root'>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0,
            height: `100%`,
            boxSizing: `border-box`,
            textRendering: `optimizeLegibility`,
            WebkitFontSmoothing: `antialiased`,
            MozOsxFontSmoothing: `grayscale`
          },
          '::selection': {
            backgroundColor: `primary`,
            color: `background`
          },
          a: {
            transition: `all 0.3s ease-in-out`
          }
        }}
      />
      <SEO />
      <TopNavigation />
      <Main>{children}</Main>
    </Styled.root>
  </ThemeProvider>
)
