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
const Layout = ({ children, path }) => (
  <Fragment>
    {/* NOTE(chrisvogt): hide the top navigation on the home page */}
    {path !== '/' && <TopNavigation />}
    {children}
    <Footer />
  </Fragment>
)

export default Layout
