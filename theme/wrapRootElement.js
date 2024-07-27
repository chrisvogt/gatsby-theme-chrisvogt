/** @jsx jsx */
import { Global } from '@emotion/react'
import { jsx } from 'theme-ui'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { Provider as ReduxProvider } from 'react-redux'
import { Themed, useThemedStylesWithMdx } from '@theme-ui/mdx'
import { ThemeUIProvider } from 'theme-ui'

import Emoji from './src/shortcodes/emoji'
import store from './src/store'
import theme from './src/gatsby-plugin-theme-ui'
import YouTube from './src/shortcodes/youtube'

const components = {
  Emoji,
  pre: ({ children }) => <Fragment>{children}</Fragment>,
  YouTube,
  Table: (props) => <Themed.table {...props} sx={{ variant: 'styles.table' }} />
}

const WrapRootElement = ({ element }) => {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
  )

  return (
    <ReduxProvider store={store}>
      <ThemeUIProvider theme={theme}>
        <Global styles={theme.global} />
        <MDXProvider components={componentsWithStyles}>{element}</MDXProvider>
      </ThemeUIProvider>
    </ReduxProvider>
  )
}

export const wrapRootElement = ({ element }) => (
  <WrapRootElement element={element} />
)

export default wrapRootElement
