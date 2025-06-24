import { shouldUpdateScroll, onRouteUpdate } from './gatsby-browser'

// Mock document methods
const mockQuerySelector = jest.fn()
const mockFocus = jest.fn()

// Mock DOM element
const mockSkipContent = {
  focus: mockFocus
}

// Setup document mock by overriding the querySelector method
beforeEach(() => {
  jest.clearAllMocks()
  // Mock the querySelector method on the existing document
  document.querySelector = mockQuerySelector
})

// Restore the original querySelector after tests
afterEach(() => {
  delete document.querySelector
})

describe('gatsby-browser', () => {
  describe('shouldUpdateScroll', () => {
    it('should return true when routerProps is undefined', () => {
      const result = shouldUpdateScroll({})
      expect(result).toBe(true)
    })

    it('should return true when routerProps is null', () => {
      const result = shouldUpdateScroll({ routerProps: null })
      expect(result).toBe(true)
    })

    it('should return false when only query parameters change', () => {
      const routerProps = {
        location: { pathname: '/blog', search: '?page=2' },
        prevLocation: { pathname: '/blog', search: '?page=1' }
      }
      const result = shouldUpdateScroll({ routerProps })
      expect(result).toBe(false)
    })

    it('should return true when pathname changes', () => {
      const routerProps = {
        location: { pathname: '/about', search: '' },
        prevLocation: { pathname: '/blog', search: '' }
      }
      const result = shouldUpdateScroll({ routerProps })
      expect(result).toBe(true)
    })

    it('should return true when prevLocation is null', () => {
      const routerProps = {
        location: { pathname: '/blog', search: '' },
        prevLocation: null
      }
      const result = shouldUpdateScroll({ routerProps })
      expect(result).toBe(true)
    })

    it('should return true when prevLocation is undefined', () => {
      const routerProps = {
        location: { pathname: '/blog', search: '' },
        prevLocation: undefined
      }
      const result = shouldUpdateScroll({ routerProps })
      expect(result).toBe(true)
    })
  })

  describe('onRouteUpdate', () => {
    it('should not call focus when prevLocation is null', () => {
      onRouteUpdate({ prevLocation: null })
      expect(mockQuerySelector).not.toHaveBeenCalled()
      expect(mockFocus).not.toHaveBeenCalled()
    })

    it('should call focus when prevLocation is undefined', () => {
      mockQuerySelector.mockReturnValue(mockSkipContent)

      onRouteUpdate({ prevLocation: undefined })

      expect(mockQuerySelector).toHaveBeenCalledWith('[data-reach-skip-nav-content]')
      expect(mockFocus).toHaveBeenCalled()
    })

    it('should call focus when skip content element exists', () => {
      mockQuerySelector.mockReturnValue(mockSkipContent)

      onRouteUpdate({ prevLocation: { pathname: '/previous' } })

      expect(mockQuerySelector).toHaveBeenCalledWith('[data-reach-skip-nav-content]')
      expect(mockFocus).toHaveBeenCalled()
    })

    it('should not call focus when skip content element does not exist', () => {
      mockQuerySelector.mockReturnValue(null)

      onRouteUpdate({ prevLocation: { pathname: '/previous' } })

      expect(mockQuerySelector).toHaveBeenCalledWith('[data-reach-skip-nav-content]')
      expect(mockFocus).not.toHaveBeenCalled()
    })

    it('should handle when querySelector returns undefined', () => {
      mockQuerySelector.mockReturnValue(undefined)

      onRouteUpdate({ prevLocation: { pathname: '/previous' } })

      expect(mockQuerySelector).toHaveBeenCalledWith('[data-reach-skip-nav-content]')
      expect(mockFocus).not.toHaveBeenCalled()
    })
  })
})
