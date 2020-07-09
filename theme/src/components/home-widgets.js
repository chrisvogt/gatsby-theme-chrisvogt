import React from 'react'

import GitHub from '../components/widgets/github'
import Goodreads from '../components/widgets/goodreads'
import RecentPosts from '../components/widgets/recent-posts'
import Spotify from '../components/widgets/spotify'

/**
 * Home Widgets
 *
 * Exports widgets to be rendered onto the home page. Override this file using
 * shadowing to add or remove widgets onto the home page.
 * 
 * For example, if you are using this as a parent theme, create a new file at
 * /src/gatsby-theme-private-sphere/components/home-widgets.js to use GatsbyJS
 * theme shadowing to override this file. The import path for Private Sphere
 * widgets is: 'gatsby-theme-private-sphere/src/components/widgets/recent-posts'
 */
const HomeWidgets = () => (
  <>
    <RecentPosts />
    <GitHub />
    <Goodreads />
    <Spotify />
  </>
)

export default HomeWidgets
