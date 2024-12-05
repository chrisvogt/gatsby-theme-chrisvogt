import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom' // Import this to use toBeInTheDocument
import Playlists from './playlists'
import MediaItemGrid from './media-item-grid'
import spotifyResponseFixture from '../../../../__mocks__/spotify.mock.json'

// Mock the MediaItemGrid component
jest.mock('./media-item-grid', () => jest.fn(() => <div data-testid='media-item-grid' />))

const playlists = spotifyResponseFixture.payload.collections.playlists

describe('Playlists Component', () => {
  it('renders playlists correctly when not loading', () => {
    const expectedItems = playlists
      .map(item => {
        const {
          external_urls: { spotify: spotifyURL } = {},
          id,
          images = [],
          name,
          tracks: { total: totalTracksCount = 0 } = {}
        } = item

        if (!totalTracksCount || images.length === 0) {
          return null
        }

        const { url: thumbnailURL } = images.find(image => image.width === 300) || images.find(image => image.url) || {}

        return {
          id,
          name,
          spotifyURL,
          thumbnailURL,
          details: `${name} (${totalTracksCount} tracks)`
        }
      })
      .filter(Boolean)
      .slice(0, 12)

    const { getByTestId } = render(<Playlists isLoading={false} playlists={playlists} />)

    // Check that the MediaItemGrid component was called with the correct props
    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: false,
        items: expectedItems
      }),
      {}
    )

    // Ensure the MediaItemGrid component is rendered
    expect(getByTestId('media-item-grid')).toBeInTheDocument()
  })

  it('limits playlists to 12 items', () => {
    const playlistsWithMoreThan12Items = Array(15)
      .fill(null)
      .map((_, index) => ({
        external_urls: { spotify: `https://open.spotify.com/playlist/${index}` },
        id: `playlist-${index}`,
        images: [{ url: `https://image.url/${index}.jpg`, width: 300 }],
        name: `Playlist ${index}`,
        tracks: { total: 10 }
      }))

    render(<Playlists isLoading={false} playlists={playlistsWithMoreThan12Items} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: playlistsWithMoreThan12Items.slice(0, 12).map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          spotifyURL: playlist.external_urls.spotify,
          thumbnailURL: playlist.images[0].url,
          details: `${playlist.name} (10 tracks)`
        }))
      }),
      {}
    )
  })

  it('skips invalid playlists', () => {
    const invalidPlaylists = [
      null,
      { id: 'invalid-1' },
      {
        id: 'invalid-2',
        tracks: { total: 0 },
        images: []
      }
    ]

    render(<Playlists isLoading={false} playlists={invalidPlaylists} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [] // No valid playlists should be passed to MediaItemGrid
      }),
      {}
    )
  })

  it('passes isLoading prop to MediaItemGrid', () => {
    render(<Playlists isLoading={true} playlists={[]} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: true, // We're only asserting for the isLoading prop
        items: [] // And that the items array is empty as expected
      }),
      expect.anything() // Ensures we're not overly specific about other props
    )
  })

  it('handles an empty playlists array', () => {
    render(<Playlists isLoading={false} playlists={[]} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [] // No playlists should be passed
      }),
      {}
    )
  })

  it('handles playlists with no images or tracks', () => {
    const playlistsWithMissingData = [
      {
        id: 'no-images',
        external_urls: { spotify: 'https://spotify.com/no-images' },
        images: [],
        name: 'No Images Playlist',
        tracks: { total: 5 }
      },
      {
        id: 'no-tracks',
        external_urls: { spotify: 'https://spotify.com/no-tracks' },
        images: [{ url: 'https://image.url/no-tracks.jpg', width: 300 }],
        name: 'No Tracks Playlist',
        tracks: { total: 0 }
      }
    ]

    render(<Playlists isLoading={false} playlists={playlistsWithMissingData} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [] // Neither playlist should be passed
      }),
      {}
    )
  })

  it('matches snapshot with various playlist scenarios', () => {
    const variedPlaylists = [
      {
        id: 'valid',
        external_urls: { spotify: 'https://spotify.com/valid' },
        images: [{ url: 'https://image.url/valid.jpg', width: 300 }],
        name: 'Valid Playlist',
        tracks: { total: 10 }
      },
      null,
      {
        id: 'invalid',
        images: [],
        tracks: { total: 0 }
      }
    ]

    const { asFragment } = render(<Playlists isLoading={false} playlists={variedPlaylists} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
