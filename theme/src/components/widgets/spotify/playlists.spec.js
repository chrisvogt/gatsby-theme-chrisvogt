import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Playlists from './playlists'
import MediaItemGrid from './media-item-grid'
import spotifyResponseFixture from '../../../../__mocks__/spotify.mock.json'
import { TestProviderWithState } from '../../../testUtils'

jest.mock('./media-item-grid', () => jest.fn(() => <div data-testid='media-item-grid' />))

const playlists = spotifyResponseFixture.payload.collections.playlists

const renderWithProvider = component => {
  return render(<TestProviderWithState>{component}</TestProviderWithState>)
}

describe('Playlists Component', () => {
  it('renders playlists correctly when not loading', () => {
    const expectedItems = playlists
      .map(item => {
        const {
          external_urls: { spotify: spotifyURL } = {},
          id,
          cdnImageURL,
          name,
          tracks: { total: totalTracksCount = 0 } = {}
        } = item

        if (!totalTracksCount || !cdnImageURL) {
          return null
        }

        return {
          id,
          name,
          spotifyURL,
          thumbnailURL: cdnImageURL,
          details: `${name} (${totalTracksCount} tracks)`
        }
      })
      .filter(Boolean)
      .slice(0, 12)

    const { getByTestId } = renderWithProvider(<Playlists isLoading={false} playlists={playlists} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: false,
        items: expectedItems
      }),
      {}
    )

    expect(getByTestId('media-item-grid')).toBeInTheDocument()
  })

  it('limits playlists to 12 items', () => {
    const playlistsWithMoreThan12Items = Array(15)
      .fill(null)
      .map((_, index) => ({
        external_urls: { spotify: `https://open.spotify.com/playlist/${index}` },
        id: `playlist-${index}`,
        cdnImageURL: `https://cdn.images.com/${index}.jpg`,
        name: `Playlist ${index}`,
        tracks: { total: 10 }
      }))

    renderWithProvider(<Playlists isLoading={false} playlists={playlistsWithMoreThan12Items} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: playlistsWithMoreThan12Items.slice(0, 12).map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          spotifyURL: playlist.external_urls.spotify,
          thumbnailURL: playlist.cdnImageURL,
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
        cdnImageURL: '',
        tracks: { total: 0 }
      }
    ]

    renderWithProvider(<Playlists isLoading={false} playlists={invalidPlaylists} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: []
      }),
      {}
    )
  })

  it('passes isLoading prop to MediaItemGrid', () => {
    renderWithProvider(<Playlists isLoading={true} playlists={[]} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: true,
        items: []
      }),
      expect.anything()
    )
  })

  it('handles an empty playlists array', () => {
    renderWithProvider(<Playlists isLoading={false} playlists={[]} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: []
      }),
      {}
    )
  })

  it('handles playlists with no image or no tracks', () => {
    const playlistsWithMissingData = [
      {
        id: 'no-image',
        external_urls: { spotify: 'https://spotify.com/no-image' },
        cdnImageURL: '',
        name: 'No Image Playlist',
        tracks: { total: 5 }
      },
      {
        id: 'no-tracks',
        external_urls: { spotify: 'https://spotify.com/no-tracks' },
        cdnImageURL: 'https://cdn.images.com/no-tracks.jpg',
        name: 'No Tracks Playlist',
        tracks: { total: 0 }
      }
    ]

    renderWithProvider(<Playlists isLoading={false} playlists={playlistsWithMissingData} />)

    expect(MediaItemGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        items: []
      }),
      {}
    )
  })

  it('matches snapshot with various playlist scenarios', () => {
    const variedPlaylists = [
      {
        id: 'valid',
        external_urls: { spotify: 'https://spotify.com/valid' },
        cdnImageURL: 'https://cdn.images.com/valid.jpg',
        name: 'Valid Playlist',
        tracks: { total: 10 }
      },
      null,
      {
        id: 'invalid',
        cdnImageURL: '',
        tracks: { total: 0 }
      }
    ]

    const { asFragment } = renderWithProvider(<Playlists isLoading={false} playlists={variedPlaylists} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
