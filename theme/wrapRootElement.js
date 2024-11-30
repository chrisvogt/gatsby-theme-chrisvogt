/** @jsx jsx */
import { Global, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { jsx } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import { Provider as ReduxProvider } from 'react-redux'
import { Themed } from '@theme-ui/mdx'
import { ThemeUIProvider } from 'theme-ui'

import Emoji from './src/shortcodes/emoji'
import store from './src/store'
import theme from './src/gatsby-plugin-theme-ui'
import YouTube from './src/shortcodes/youtube'

// Create an Emotion cache
const cache = createCache({ key: 'css', prepend: true })

// Define MDX components
const components = {
  Emoji,
  pre: ({ children }) => <>{children}</>,
  YouTube,
  Table: (props) => <Themed.table {...props} sx={{ variant: 'styles.table' }} />
}

const WrapRootElement = ({ element }) => (
  <CacheProvider value={cache}>
    <ReduxProvider store={store}>
      <ThemeUIProvider theme={theme}>
        <Global styles={theme.global} />
        <MDXProvider components={components}>{element}</MDXProvider>
      </ThemeUIProvider>
    </ReduxProvider>
  </CacheProvider>
)

export default WrapRootElement
