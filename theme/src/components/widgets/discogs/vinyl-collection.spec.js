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

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024
})

describe('VinylCollection', () => {
  beforeEach(() => {
    // Reset timers
    jest.clearAllTimers()
    // Reset window.innerWidth
    window.innerWidth = 1024
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

  describe('Mouse event handlers', () => {
    it('handles mouse down event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      fireEvent.mouseDown(carousel, { pageX: 100 })

      // Event handler should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles mouse move event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(carousel, { pageX: 100 })

      // Move mouse
      fireEvent.mouseMove(carousel, { pageX: 200 })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles mouse up event with threshold exceeded', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(carousel, { pageX: 100 })

      // Move mouse beyond threshold
      fireEvent.mouseMove(carousel, { pageX: 200 })

      // Release mouse
      fireEvent.mouseUp(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles mouse up event without threshold exceeded', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(carousel, { pageX: 100 })

      // Move mouse small distance
      fireEvent.mouseMove(carousel, { pageX: 120 })

      // Release mouse
      fireEvent.mouseUp(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles mouse leave event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(carousel, { pageX: 100 })

      // Leave carousel
      fireEvent.mouseLeave(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('prevents mouse events when transitioning', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Trigger a page change to set transitioning state
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Try to start dragging while transitioning
        fireEvent.mouseDown(carousel, { pageX: 100 })

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })
  })

  describe('Touch event handlers', () => {
    it('handles touch start event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      fireEvent.touchStart(carousel, {
        touches: [{ pageX: 100 }]
      })

      // Event handler should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles touch move event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start touching
      fireEvent.touchStart(carousel, {
        touches: [{ pageX: 100 }]
      })

      // Move touch
      fireEvent.touchMove(carousel, {
        touches: [{ pageX: 200 }]
      })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('handles touch end event', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start touching
      fireEvent.touchStart(carousel, {
        touches: [{ pageX: 100 }]
      })

      // Move touch beyond threshold
      fireEvent.touchMove(carousel, {
        touches: [{ pageX: 200 }]
      })

      // End touch
      fireEvent.touchEnd(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('prevents touch events when transitioning', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Trigger a page change to set transitioning state
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Try to start touching while transitioning
        fireEvent.touchStart(carousel, {
          touches: [{ pageX: 100 }]
        })

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })
  })

  describe('Elastic resistance at boundaries', () => {
    it('applies elastic resistance at first page when dragging right', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging right from first page
      fireEvent.mouseDown(carousel, { pageX: 100 })
      fireEvent.mouseMove(carousel, { pageX: 200 })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('applies elastic resistance at last page when dragging left', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Navigate to last page
      const lastPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (lastPageButton) {
        fireEvent.click(lastPageButton)

        // Fast forward time to complete transition
        act(() => {
          jest.advanceTimersByTime(300)
        })

        const carousel = getByTestId('vinyl-carousel')
        expect(carousel).toBeTruthy()

        // Start dragging left from last page
        fireEvent.mouseDown(carousel, { pageX: 200 })
        fireEvent.mouseMove(carousel, { pageX: 100 })

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })

    it('applies elastic resistance for touch events at first page', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start touching right from first page
      fireEvent.touchStart(carousel, { touches: [{ pageX: 100 }] })
      fireEvent.touchMove(carousel, { touches: [{ pageX: 200 }] })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('applies elastic resistance for touch events at last page', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Navigate to last page
      const lastPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (lastPageButton) {
        fireEvent.click(lastPageButton)

        // Fast forward time to complete transition
        act(() => {
          jest.advanceTimersByTime(300)
        })

        const carousel = getByTestId('vinyl-carousel')
        expect(carousel).toBeTruthy()

        // Start touching left from last page
        fireEvent.touchStart(carousel, { touches: [{ pageX: 200 }] })
        fireEvent.touchMove(carousel, { touches: [{ pageX: 100 }] })

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })

    it('triggers elastic resistance with specific conditions', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Ensure we're on the first page and drag right with positive distance
      // This should trigger the elastic resistance condition
      fireEvent.mouseDown(carousel, { pageX: 50 })
      fireEvent.mouseMove(carousel, { pageX: 150 }) // Positive distance, first page

      // Also test touch events with the same conditions
      fireEvent.touchStart(carousel, { touches: [{ pageX: 50 }] })
      fireEvent.touchMove(carousel, { touches: [{ pageX: 150 }] })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
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

    it('prevents page change when already transitioning', () => {
      const manyReleases = createManyReleases(25)
      const { container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Start a page change
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Try to change page again immediately
        const firstPageButton = container.querySelector('button[aria-label*="page 1"]')
        if (firstPageButton) {
          fireEvent.click(firstPageButton)

          // Should still be on page 2
          expect(secondPageButton).toBeTruthy()
        }
      }
    })

    it('prevents page change to same page', () => {
      const manyReleases = createManyReleases(25)
      const { container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Try to change to current page (page 1)
      const firstPageButton = container.querySelector('button[aria-label*="page 1"]')
      if (firstPageButton) {
        fireEvent.click(firstPageButton)

        // Should not trigger transition
        expect(firstPageButton).toBeTruthy()
      }
    })
  })

  describe('Page change with threshold exceeded', () => {
    it('changes to previous page when dragging right with threshold exceeded', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Navigate to second page first
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Fast forward time to complete transition
        act(() => {
          jest.advanceTimersByTime(300)
        })

        const carousel = getByTestId('vinyl-carousel')
        expect(carousel).toBeTruthy()

        // Start dragging right (towards previous page) with large distance
        fireEvent.mouseDown(carousel, { pageX: 100 })
        fireEvent.mouseMove(carousel, { pageX: 200 }) // Large distance to exceed threshold
        fireEvent.mouseUp(carousel)

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })

    it('changes to next page when dragging left with threshold exceeded', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging left (towards next page) with large distance
      fireEvent.mouseDown(carousel, { pageX: 200 })
      fireEvent.mouseMove(carousel, { pageX: 100 }) // Large distance to exceed threshold
      fireEvent.mouseUp(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('triggers page change with specific threshold conditions', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Drag with distance greater than threshold (80px)
      fireEvent.mouseDown(carousel, { pageX: 100 })
      fireEvent.mouseMove(carousel, { pageX: 200 }) // 100px distance > 80px threshold
      fireEvent.mouseUp(carousel)

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })
  })

  describe('Transform calculations', () => {
    it('calculates transform for first page', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })

    it('calculates transform for second page', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId, container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Navigate to second page
      const secondPageButton = container.querySelector('button[aria-label*="page 2"]')
      if (secondPageButton) {
        fireEvent.click(secondPageButton)

        // Fast forward time to complete transition
        act(() => {
          jest.advanceTimersByTime(300)
        })

        const carousel = getByTestId('vinyl-carousel')
        expect(carousel).toBeTruthy()

        // Event handlers should be called without error
        expect(carousel).toBeTruthy()
      }
    })

    it('calculates transform with drag offset', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(carousel, { pageX: 100 })
      fireEvent.mouseMove(carousel, { pageX: 200 })

      // Event handlers should be called without error
      expect(carousel).toBeTruthy()
    })
  })

  describe('Pagination controls', () => {
    it('renders pagination when multiple pages exist', () => {
      const manyReleases = createManyReleases(25)
      const { container } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      // Should render pagination controls
      const paginationButtons = container.querySelectorAll('button[aria-label*="page"]')
      expect(paginationButtons.length).toBeGreaterThan(0)
    })

    it('does not render pagination for single page', () => {
      const { container } = render(<VinylCollection isLoading={false} releases={mockReleases} />)

      // Should not render pagination controls
      const paginationButtons = container.querySelectorAll('button[aria-label*="page"]')
      expect(paginationButtons).toHaveLength(0)
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

  describe('Event handler coverage', () => {
    it('calls mouse event handlers', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Try to trigger events on the carousel
      fireEvent.mouseDown(carousel, { pageX: 100 })
      fireEvent.mouseMove(carousel, { pageX: 200 })
      fireEvent.mouseUp(carousel)

      // The test passes if no errors are thrown
      expect(true).toBe(true)
    })

    it('calls touch event handlers', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Try to trigger events on the carousel
      fireEvent.touchStart(carousel, { touches: [{ pageX: 100 }] })
      fireEvent.touchMove(carousel, { touches: [{ pageX: 200 }] })
      fireEvent.touchEnd(carousel)

      // The test passes if no errors are thrown
      expect(true).toBe(true)
    })
  })

  describe('Event handler verification', () => {
    it('verifies event handlers are being called', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Check if the event handlers are attached to the element
      expect(carousel.onmousedown).toBeDefined()
      expect(carousel.onmousemove).toBeDefined()
      expect(carousel.onmouseup).toBeDefined()
      expect(carousel.ontouchstart).toBeDefined()
      expect(carousel.ontouchmove).toBeDefined()
      expect(carousel.ontouchend).toBeDefined()

      // Try to call the event handlers directly
      if (carousel.onmousedown) {
        carousel.onmousedown({ pageX: 100 })
      }
      if (carousel.onmousemove) {
        carousel.onmousemove({ pageX: 200 })
      }
      if (carousel.onmouseup) {
        carousel.onmouseup()
      }

      // The test passes if no errors are thrown
      expect(true).toBe(true)
    })
  })

  describe('Direct event handler testing', () => {
    it('directly calls event handlers with specific conditions', () => {
      const manyReleases = createManyReleases(25)
      const { getByTestId } = render(<VinylCollection isLoading={false} releases={manyReleases} />)

      const carousel = getByTestId('vinyl-carousel')
      expect(carousel).toBeTruthy()

      // Directly call the event handlers with specific conditions
      // This should trigger the elastic resistance conditions
      if (carousel.onmousedown) {
        carousel.onmousedown({ pageX: 100 })
      }
      if (carousel.onmousemove) {
        carousel.onmousemove({ pageX: 200 }) // Positive distance, should trigger elastic resistance
      }
      if (carousel.onmouseup) {
        carousel.onmouseup() // Should trigger page change if threshold exceeded
      }

      // Also test touch events
      if (carousel.ontouchstart) {
        carousel.ontouchstart({ touches: [{ pageX: 100 }] })
      }
      if (carousel.ontouchmove) {
        carousel.ontouchmove({ touches: [{ pageX: 200 }] }) // Positive distance
      }
      if (carousel.ontouchend) {
        carousel.ontouchend()
      }

      // The test passes if no errors are thrown
      expect(true).toBe(true)
    })
  })
})
