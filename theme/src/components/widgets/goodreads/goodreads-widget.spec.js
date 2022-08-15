import React from 'react'
import GoodreadsWidget from './goodreads-widget'
import renderer from 'react-test-renderer'
import { TestProviderWithState } from '../../../testUtils'
import useSiteMetadata from '../../../hooks/use-site-metadata'

jest.mock('../../../hooks/use-site-metadata')

const mockSiteMetadata = {
  widgets: {
    goodreads: {
      username: 'mockusername',
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/goodreads'
    }
  }
}

describe('Goodreads Widget', () => {
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
          <GoodreadsWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
