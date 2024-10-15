import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'// Import this to use toBeInTheDocument
import Playlists from './playlists'
import MediaItemGrid from './media-item-grid'
import spotifyResponseFixture from '../../../../__mocks__/spotify.mock.json'

// Mock the MediaItemGrid component
jest.mock('./media-item-grid', () => jest.fn(() => <div data-testid="media-item-grid" />))

const playlists = spotifyResponseFixture.payload.collections.playlists

describe('Playlists Component', () => {
  it('renders playlists correctly when not loading', () => {
    const expectedItems = playlists.map(item => {
      const {
        external_urls: { spotify: spotifyURL } = {},
        id,
        images = [],
        name,
        tracks: { total: totalTracksCount = 0 } = {},
      } = item

      if (!totalTracksCount) {
        return null
      }

      const { url: thumbnailURL } =
        images.find(image => image.width === 300) ||
        images.find(image => image.url) ||
        {}

      return {
        id,
        name,
        spotifyURL,
        thumbnailURL,
        details: `${name} (${totalTracksCount} tracks)`,
      }
    }).filter(Boolean)

    const { getByTestId } = render(<Playlists isLoading={false} playlists={playlists} />)

    // Check that the MediaItemGrid component was called with the correct props
    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: false,
        items: expectedItems,
      }),
      {}
    )

    // Ensure the MediaItemGrid component is rendered
    expect(getByTestId('media-item-grid')).toBeInTheDocument()
  })

  it('matches the snapshot', () => {
    const { asFragment } = render(<Playlists isLoading={false} playlists={playlists} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
