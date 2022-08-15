import React from 'react'
import SpotifyWidget from './spotify-widget'
import renderer from 'react-test-renderer'
import { TestProviderWithState } from '../../../testUtils'
import useSiteMetadata from '../../../hooks/use-site-metadata'

jest.mock('../../../hooks/use-site-metadata')

const mockSiteMetadata = {
  widgets: {
    spotify: {
      username: 'mockusername',
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/spotify'
    }
  }
}

describe('Spotify Widget', () => {
  beforeEach(() => {
    useSiteMetadata.mockImplementation(() => mockSiteMetadata)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the loading state snapshot', () => {
    const tree = renderer
      .create(
        <TestProviderWithState>
          <SpotifyWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
