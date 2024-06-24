/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import Footer from './footer'
import TopNavigation from './top-navigation'

/**
 * Layout
 *
 * The default layout component. Wrap all templates in this layout to inherit
 * the default navigation, theme styles, and any important providers. Use shadowing
 * to extend this component and attach additional contexts and providers.
 */
const Layout = ({ children, disableMainWrapper, hideHeader }) => (
  <div sx={{
    backgroundColor: theme => theme?.colors?.background,
    color: theme => theme?.colors?.text
  }}>
    {/* NOTE(chrisvogt): hide the top navigation on the home and 404 pages */}
    {!hideHeader && (
      <header role='banner'>
        <TopNavigation />
      </header>
    )}
    {
      disableMainWrapper ? children : (
        <main role='main'>
          {children}
        </main>
      )
    }
    <Footer />
  </div>
)

export default Layout
