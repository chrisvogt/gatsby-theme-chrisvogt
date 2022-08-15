import React from 'react'
import InstagramWidget from './instagram-widget'
import renderer from 'react-test-renderer'
import { TestProviderWithState } from '../../../testUtils'
import useSiteMetadata from '../../../hooks/use-site-metadata'

jest.mock('../../../hooks/use-site-metadata')

const mockSiteMetadata = {
  widgets: {
    instagram: {
      username: 'mockusername',
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/instagram'
    }
  }
}

describe('Instagram Widget', () => {
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
          <InstagramWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
