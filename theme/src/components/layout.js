/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import BackgroundPattern from './background-pattern'
import Footer from './footer'
import TopNavigation from './top-navigation'
import trianglify from './artwork/trianglify.svg'

/**
 * Layout
 *
 * The default layout component. Wrap all templates in this layout to inherit
 * the default navigation, theme styles, and any important providers. Use shadowing
 * to extend this component and attach additional contexts and providers.
 */
const Layout = ({ children, disableMainWrapper, hideHeader, hideFooter }) => (
  <div sx={{
    backgroundColor: 'background',
    position: 'relative', // stretch to full height
    color: theme => theme?.colors?.text
  }}>
    <BackgroundPattern />

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

    {!hideFooter && <Footer />}
  </div>
)

export default Layout
