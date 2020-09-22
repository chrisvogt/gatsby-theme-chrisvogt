/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'theme-ui'

import theme from './src/gatsby-plugin-theme-ui'
import Emoji from './src/shortcodes/emoji'
import YouTube from './src/shortcodes/youtube'

const components = {
  pre: ({ children }) => <Fragment>{children}</Fragment>
}

const shortcodes = { Emoji, YouTube }

// NOTE(chrisvogt): wraps the root element and attaches context providers
const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme} components={components}>
    <MDXProvider components={shortcodes}>{element}</MDXProvider>
  </ThemeProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired
}

export default wrapRootElement
