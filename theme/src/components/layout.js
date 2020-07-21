/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'

import theme from '../gatsby-plugin-theme-ui'
import TopNavigation from './top-navigation'
import YouTube from '../shortcodes/youtube'

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
      {!hideNavigation && <TopNavigation />}
      {children}
    </MDXProvider>
  </ThemeProvider>
)

export default Layout
