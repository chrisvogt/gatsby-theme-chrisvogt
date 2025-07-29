import React from 'react'
import renderer from 'react-test-renderer'

import VinylCollection from './vinyl-collection'

const mockReleases = [
  {
    id: 28461454,
    basicInformation: {
      id: 28461454,
      title: 'The Rise & Fall Of A Midwest Princess',
      year: 2023,
      artists: [{ name: 'Chappell Roan' }],
      cdnThumbUrl: 'https://example.com/thumb1.jpg',
      resourceUrl: 'https://discogs.com/release/123'
    }
  },
  {
    id: 33129744,
    basicInformation: {
      id: 33129744,
      title: 'Brat And It\'s Completely Different',
      year: 2025,
      artists: [{ name: 'Charli XCX' }],
      cdnThumbUrl: 'https://example.com/thumb2.jpg',
      resourceUrl: 'https://discogs.com/release/456'
    }
  }
]

describe('VinylCollection', () => {
  it('renders loading state', () => {
    const tree = renderer
      .create(<VinylCollection isLoading={true} releases={[]} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with vinyl releases', () => {
    const tree = renderer
      .create(<VinylCollection isLoading={false} releases={mockReleases} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when no releases', () => {
    const tree = renderer
      .create(<VinylCollection isLoading={false} releases={[]} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
}) 