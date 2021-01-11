import React from 'react'

import GitHub from '../components/widgets/github'
import Goodreads from '../components/widgets/goodreads'
import Instagram from '../components/widgets/instagram'
import RecentPosts from '../components/widgets/recent-posts'
import Spotify from '../components/widgets/spotify'
import Steam from '../components/widgets/steam'

import useSiteMetadata from '../hooks/use-site-metadata'
import {
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource,
  getSteamWidgetDataSource
} from '../selectors/metadata'

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
const HomeWidgets = () => {
  const metadata = useSiteMetadata()

  const githubDataSource = getGithubWidgetDataSource(metadata)
  const goodreadsDataSource = getGoodreadsWidgetDataSource(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)
  const spotifyDataSource = getSpotifyWidgetDataSource(metadata)
  const steamDataSource = getSteamWidgetDataSource(metadata)

  return (
    <>
      <RecentPosts />

      {instagramDataSource && <Instagram />}
      {githubDataSource && <GitHub />}
      {goodreadsDataSource && <Goodreads />}
      {spotifyDataSource && <Spotify />}
      {steamDataSource && <Steam />}
    </>
  )
}

export default HomeWidgets
