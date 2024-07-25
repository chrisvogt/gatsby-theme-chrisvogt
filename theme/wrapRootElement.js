/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Global } from '@emotion/react'
import { MDXProvider } from '@mdx-js/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeUIProvider } from 'theme-ui'

import store from './src/store'
import theme from './src/gatsby-plugin-theme-ui'
import Emoji from './src/shortcodes/emoji'
import YouTube from './src/shortcodes/youtube'

const components = {
  pre: ({ children }) => <Fragment>{children}</Fragment>
}

const shortcodes = { Emoji, YouTube }

const wrapRootElement = ({ element }) => (
  <ReduxProvider store={store}>
    <ThemeUIProvider theme={theme} components={components}>
      <Global styles={theme.global} />
      <MDXProvider components={shortcodes}>{element}</MDXProvider>
    </ThemeUIProvider>
  </ReduxProvider>
)

export default wrapRootElement
