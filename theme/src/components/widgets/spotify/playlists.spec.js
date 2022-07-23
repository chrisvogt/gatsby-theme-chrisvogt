import React from 'react'
import renderer from 'react-test-renderer'
import Playlists from './playlists'

import spotifyResponseFixture from '../../../../__mocks__/spotify.mock.json'

const playlists = spotifyResponseFixture.payload.collections.playlists;

describe('Playlists', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Playlists
          isLoading={ false }
          playlists={ playlists }
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
