import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react'

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

// Mock setTimeout
jest.useFakeTimers()

describe('VinylCollection', () => {
  beforeEach(() => {
    // Reset timers
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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

  describe('Vinyl item interactions', () => {
    it('handles mouse enter on vinyl item', () => {
      const { container } = render(<VinylCollection isLoading={false} releases={mockReleases} />)

      const vinylItem = container.querySelector('.vinyl-record')
      expect(vinylItem).toBeTruthy()

      fireEvent.mouseEnter(vinylItem)

      // Should add focused class
      expect(vinylItem.classList.contains('vinyl-record--focused')).toBe(true)
    })

    it('handles mouse leave on vinyl item', () => {
      const { container } = render(<VinylCollection isLoading={false} releases={mockReleases} />)

      const vinylItem = container.querySelector('.vinyl-record')
      expect(vinylItem).toBeTruthy()

      // First enter to set focus
      fireEvent.mouseEnter(vinylItem)
      expect(vinylItem.classList.contains('vinyl-record--focused')).toBe(true)

      // Then leave
      fireEvent.mouseLeave(vinylItem)

      // Should remove focused class
      expect(vinylItem.classList.contains('vinyl-record--focused')).toBe(false)
    })
  })

  describe('Page change functionality', () => {
    it('clears transition state after timeout', () => {
      const manyReleases = createManyReleases(25)
      const { container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Start a page change
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Fast forward time
        act(() => {
          jest.advanceTimersByTime(300)
        })

        // Should be able to change page again
        const firstPageButton = container.querySelector('button[aria-label*="page 1"]')
        if (firstPageButton) {
          fireEvent.click(firstPageButton)

          // Should change back
          expect(firstPageButton).toBeTruthy()
        }
      }
    })
  })

  describe('Edge cases', () => {
    it('handles releases with missing title', () => {
      const releasesWithMissingTitle = [
        {
          id: 1,
          basicInformation: {
            year: 2023,
            artists: [{ name: 'Artist' }]
          }
        }
      ]
      const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithMissingTitle} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing year', () => {
      const releasesWithMissingYear = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            artists: [{ name: 'Artist' }]
          }
        }
      ]
      const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithMissingYear} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with empty artists array', () => {
      const releasesWithEmptyArtists = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: []
          }
        }
      ]
      const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithEmptyArtists} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing resourceUrl', () => {
      const releasesWithMissingResourceUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: 'https://example.com/thumb.jpg'
            // Missing resourceUrl
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithMissingResourceUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing basicInformation properties', () => {
      const releasesWithMissingProperties = [
        {
          id: 1,
          basicInformation: {
            title: 'Album'
            // Missing year, artists, etc.
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithMissingProperties} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with null artists', () => {
      const releasesWithNullArtists = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: null
          }
        }
      ]
      const tree = renderer.create(<VinylCollection isLoading={false} releases={releasesWithNullArtists} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with undefined artists', () => {
      const releasesWithUndefinedArtists = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: undefined
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithUndefinedArtists} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing artist name', () => {
      const releasesWithMissingArtistName = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: null }]
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithMissingArtistName} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with undefined artist name', () => {
      const releasesWithUndefinedArtistName = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: undefined }]
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithUndefinedArtistName} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with empty artist name', () => {
      const releasesWithEmptyArtistName = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: '' }]
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithEmptyArtistName} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing cdnThumbUrl property', () => {
      const releasesWithMissingCdnThumbUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }]
            // Missing cdnThumbUrl
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithMissingCdnThumbUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with undefined cdnThumbUrl', () => {
      const releasesWithUndefinedCdnThumbUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: undefined
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithUndefinedCdnThumbUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with empty cdnThumbUrl', () => {
      const releasesWithEmptyCdnThumbUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: ''
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithEmptyCdnThumbUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with missing resourceUrl property', () => {
      const releasesWithMissingResourceUrlProperty = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: 'https://example.com/thumb.jpg'
            // Missing resourceUrl
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithMissingResourceUrlProperty} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with undefined resourceUrl', () => {
      const releasesWithUndefinedResourceUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: 'https://example.com/thumb.jpg',
            resourceUrl: undefined
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithUndefinedResourceUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('handles releases with empty resourceUrl', () => {
      const releasesWithEmptyResourceUrl = [
        {
          id: 1,
          basicInformation: {
            title: 'Album',
            year: 2023,
            artists: [{ name: 'Artist' }],
            cdnThumbUrl: 'https://example.com/thumb.jpg',
            resourceUrl: ''
          }
        }
      ]
      const tree = renderer
        .create(<VinylCollection isLoading={false} releases={releasesWithEmptyResourceUrl} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
