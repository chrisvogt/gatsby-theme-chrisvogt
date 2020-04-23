/** @jsx jsx */
import { Fragment } from 'react'
import { Global } from '@emotion/core'
import { jsx, Styled, ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'

import TopNavigation from './top-navigation'
import YouTube from '../shortcodes/youtube'

import theme from '../gatsby-plugin-theme-ui'

const components = {
  pre: ({ children }) => <Fragment>{children}</Fragment>
}

const shortcodes = { YouTube }

export default ({ children, hideNavigation }) => (
  <ThemeProvider theme={theme} components={components}>
    <MDXProvider components={shortcodes}>
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
            },
            table: {
              width: `100%`,
              textAlign: `left`,
              th: {
                background: theme.colors.dark,
                color: theme.colors.light,
                padding: theme.space[3],
                textAlign: `left`
              },
              'tr th:first-of-type': {
                borderLeft: `0`,
                borderTopLeftRadius: `8px`
              },
              'tr th:last-of-type': {
                borderRight: `0`,
                borderTopRightRadius: `8px`
              },
              'tr td': {
                borderBottom: `1px dotted ${theme.colors.muted}`,
                padding: theme.space[3]
              },
              'tr:last-of-type td': {
                borderBottom: `2px solid ${theme.colors.dark}`
              },
              'tbody tr td:first-of-type': {
                borderLeft: `2px solid ${theme.colors.dark}`,
                borderRight: `1px solid ${theme.colors.dark}`
              },
              'tbody tr td:last-of-type': {
                borderRight: `2px solid ${theme.colors.dark}`
              }
            },
            '.footnotes': {
              fontSize: theme.fontSizes[1]
            },
            '.text-center': {
              textAlign: `center`
            },
            '.VideoWrapper': {
              position: `relative`,
              paddingBottom: `56.25%` /* 16:9 */,
              paddingTop: `25px`,
              height: 0
            },
            '.VideoWrapper iframe': {
              position: `absolute`,
              top: 0,
              left: 0,
              width: `100%`,
              height: `100%`
            }
          }}
        />
        {!hideNavigation && <TopNavigation />}
        {children}
      </Styled.root>
    </MDXProvider>
  </ThemeProvider>
)
