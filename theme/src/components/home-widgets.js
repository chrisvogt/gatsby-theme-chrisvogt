import React from 'react'

import GitHub from '../components/widgets/github'
import Goodreads from '../components/widgets/goodreads'
import Instagram from '../components/widgets/instagram'
import RecentPosts from '../components/widgets/recent-posts'
import Spotify from '../components/widgets/spotify'

/**
 * Home Widgets
 *
 * Exports widgets to be rendered onto the home page. Override this file using
 * shadowing to add or remove widgets onto the home page.
 */
const HomeWidgets = () => (
  <>
    <RecentPosts />
    <Instagram />
    <GitHub />
    <Goodreads />
    <Spotify />
  </>
)

export default HomeWidgets
