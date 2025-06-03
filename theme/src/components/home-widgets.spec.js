import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeWidgets from './home-widgets'
import useSiteMetadata from '../hooks/use-site-metadata'
import {
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource
} from '../selectors/metadata'

// Mock components
jest.mock('../components/widgets/github', () => () => <div data-testid='github-widget'>GitHub Widget</div>)
jest.mock('../components/widgets/goodreads', () => () => <div data-testid='goodreads-widget'>Goodreads Widget</div>)
jest.mock('../components/widgets/instagram', () => () => <div data-testid='instagram-widget'>Instagram Widget</div>)
jest.mock('../components/widgets/spotify', () => () => <div data-testid='spotify-widget'>Spotify Widget</div>)
jest.mock('../components/widgets/recent-posts', () => () => (
  <div data-testid='recent-posts-widget'>Recent Posts Widget</div>
))

// Mock hooks
jest.mock('../hooks/use-site-metadata')
jest.mock('../selectors/metadata')

describe('HomeWidgets', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders RecentPosts widget by default', () => {
    useSiteMetadata.mockReturnValue({})
    getGithubWidgetDataSource.mockReturnValue(false)
    getGoodreadsWidgetDataSource.mockReturnValue(false)
    getInstagramWidgetDataSource.mockReturnValue(false)
    getSpotifyWidgetDataSource.mockReturnValue(false)

    render(<HomeWidgets />)

    expect(screen.getByTestId('recent-posts-widget')).toBeInTheDocument()
    expect(screen.queryByTestId('github-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('goodreads-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('instagram-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('spotify-widget')).not.toBeInTheDocument()
  })

  it('renders GitHub widget if githubDataSource is true', () => {
    useSiteMetadata.mockReturnValue({})
    getGithubWidgetDataSource.mockReturnValue(true)
    getGoodreadsWidgetDataSource.mockReturnValue(false)
    getInstagramWidgetDataSource.mockReturnValue(false)
    getSpotifyWidgetDataSource.mockReturnValue(false)

    render(<HomeWidgets />)

    expect(screen.getByTestId('github-widget')).toBeInTheDocument()
    expect(screen.queryByTestId('goodreads-widget')).not.toBeInTheDocument()
  })

  it('renders Goodreads widget if goodreadsDataSource is true', () => {
    useSiteMetadata.mockReturnValue({})
    getGithubWidgetDataSource.mockReturnValue(false)
    getGoodreadsWidgetDataSource.mockReturnValue(true)
    getInstagramWidgetDataSource.mockReturnValue(false)
    getSpotifyWidgetDataSource.mockReturnValue(false)

    render(<HomeWidgets />)

    expect(screen.getByTestId('goodreads-widget')).toBeInTheDocument()
    expect(screen.queryByTestId('github-widget')).not.toBeInTheDocument()
  })

  it('renders Instagram and Spotify widgets if both data sources are true', () => {
    useSiteMetadata.mockReturnValue({})
    getGithubWidgetDataSource.mockReturnValue(false)
    getGoodreadsWidgetDataSource.mockReturnValue(false)
    getInstagramWidgetDataSource.mockReturnValue(true)
    getSpotifyWidgetDataSource.mockReturnValue(true)

    render(<HomeWidgets />)

    expect(screen.getByTestId('instagram-widget')).toBeInTheDocument()
    expect(screen.getByTestId('spotify-widget')).toBeInTheDocument()
  })

  it('does not render any widgets if all data sources are false', () => {
    useSiteMetadata.mockReturnValue({})
    getGithubWidgetDataSource.mockReturnValue(false)
    getGoodreadsWidgetDataSource.mockReturnValue(false)
    getInstagramWidgetDataSource.mockReturnValue(false)
    getSpotifyWidgetDataSource.mockReturnValue(false)

    render(<HomeWidgets />)

    expect(screen.getByTestId('recent-posts-widget')).toBeInTheDocument()
    expect(screen.queryByTestId('github-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('goodreads-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('instagram-widget')).not.toBeInTheDocument()
    expect(screen.queryByTestId('spotify-widget')).not.toBeInTheDocument()
  })
})
