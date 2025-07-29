import React from 'react'
import renderer from 'react-test-renderer'

import { TestProviderWithState } from '../../../testUtils'
import DiscogsWidget from './discogs-widget'
import useSiteMetadata from '../../../hooks/use-site-metadata'

jest.mock('../../../hooks/use-site-metadata')

const mockSiteMetadata = {
  widgets: {
    discogs: {
      widgetDataSource: 'https://fake-api.example.com/widgets/discogs'
    }
  }
}

describe('Discogs Widget', () => {
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
          <DiscogsWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches the loaded state snapshot', () => {
    const initialState = {
      widgets: {
        discogs: {
          state: 'SUCCESS',
          data: {
            collections: {
              releases: [
                {
                  id: 28461454,
                  instanceId: 2045415075,
                  basicInformation: {
                    id: 28461454,
                    title: 'The Rise & Fall Of A Midwest Princess',
                    year: 2023,
                    artists: [{ name: 'Chappell Roan' }],
                    cdnThumbUrl: 'https://example.com/thumb.jpg',
                    resourceUrl: 'https://discogs.com/release/123'
                  }
                }
              ]
            },
            metrics: {
              'Vinyls Owned': 37
            },
            profile: {
              profileURL: 'https://www.discogs.com/user/chrisvogt/collection'
            }
          }
        }
      }
    }

    const tree = renderer
      .create(
        <TestProviderWithState initialState={initialState}>
          <DiscogsWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches the error state snapshot', () => {
    const initialState = {
      widgets: {
        discogs: {
          state: 'FAILURE',
          data: null
        }
      }
    }

    const tree = renderer
      .create(
        <TestProviderWithState initialState={initialState}>
          <DiscogsWidget />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
