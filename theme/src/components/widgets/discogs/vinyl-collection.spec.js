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
      title: "Brat And It's Completely Different",
      year: 2025,
      artists: [{ name: 'Charli XCX' }],
      cdnThumbUrl: 'https://example.com/thumb2.jpg',
      resourceUrl: 'https://discogs.com/release/456'
    }
  }
]

// Create enough releases to test pagination (more than 18 items)
const createManyReleases = count => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    basicInformation: {
      id: i + 1,
      title: `Album ${i + 1}`,
      year: 2020 + (i % 5),
      artists: [{ name: `Artist ${i + 1}` }],
      cdnThumbUrl: `https://example.com/thumb${i + 1}.jpg`,
      resourceUrl: `https://discogs.com/release/${i + 1}`
    }
  }))
}

describe('VinylCollection', () => {
  it('renders loading state', () => {
    const tree = renderer.create(<VinylCollection isLoading={true} releases={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with vinyl releases', () => {
    const tree = renderer.create(<VinylCollection isLoading={false} releases={mockReleases} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when no releases', () => {
    const tree = renderer.create(<VinylCollection isLoading={false} releases={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with many releases for pagination testing', () => {
    const manyReleases = createManyReleases(25)
    const tree = renderer.create(<VinylCollection isLoading={false} releases={manyReleases} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles releases with missing basicInformation', () => {
    const releasesWithMissingData = [
      {
        id: 1,
        basicInformation: null
      },
      {
        id: 2,
        basicInformation: {
          title: 'Valid Album',
          year: 2023,
          artists: [{ name: 'Valid Artist' }]
        }
      }
    ]
    const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithMissingData} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles releases with missing artist information', () => {
    const releasesWithMissingArtists = [
      {
        id: 1,
        basicInformation: {
          title: 'Album Without Artists',
          year: 2023,
          artists: null
        }
      }
    ]
    const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithMissingArtists} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles releases with multiple artists', () => {
    const releasesWithMultipleArtists = [
      {
        id: 1,
        basicInformation: {
          title: 'Collaboration Album',
          year: 2023,
          artists: [{ name: 'Artist 1' }, { name: 'Artist 2' }, { name: 'Artist 3' }]
        }
      }
    ]
    const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithMultipleArtists} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles releases without CDN thumb URL', () => {
    const releasesWithoutThumb = [
      {
        id: 1,
        basicInformation: {
          title: 'Album Without Thumb',
          year: 2023,
          artists: [{ name: 'Artist' }],
          cdnThumbUrl: null,
          resourceUrl: 'https://discogs.com/release/123'
        }
      }
    ]
    const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithoutThumb} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
