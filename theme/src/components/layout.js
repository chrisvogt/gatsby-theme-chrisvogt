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

/**
 * Layout
 *
 * The default layout component. Wrap all templates in this layout to inherit
 * the default navigation, theme styles, and any important providers. Use shadowing
 * to extend this component and attach additional contexts and providers.
 */
const Layout = ({ children, hideNavigation }) => (
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
                borderBottom: `1px dotted #ddd`,
                borderLeft: `1px dotted #ddd`,
                borderTop: `1px solid #ddd`,
                color: `text`,
                padding: theme.space[2],
                textAlign: `left`
              },
              'tr th:first-of-type': {
                borderLeft: `1px solid #ddd`,
                borderTopLeftRadius: `4px`
              },
              'tr th:last-of-type': {
                borderRight: `1px solid #ddd`,
                borderTopRightRadius: `4px`
              },
              'tr td': {
                borderBottom: `1px dotted #ddd`,
                padding: theme.space[2]
              },
              'tr:last-of-type td': {
                borderBottom: `1px solid #ddd`
              },
              'tbody tr td:first-of-type': {
                borderLeft: `1px solid #ddd`
              },
              'tbody tr td:last-of-type': {
                borderRight: `1px solid #ddd`
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
            },

            '.gatsby-highlight pre[class*="language-"]': {
              padding: 0,
              overflow: `initial`,
              float: `left`,
              minWidth: `100%`
            },

            /* Adjust the position of the line numbers */
            '.gatsby-highlight pre[class*="language-"].line-numbers': {
              paddingLeft: `2.8em`
            }
          }}
        />
        {!hideNavigation && <TopNavigation />}
        {children}
      </Styled.root>
    </MDXProvider>
  </ThemeProvider>
)

export default Layout
