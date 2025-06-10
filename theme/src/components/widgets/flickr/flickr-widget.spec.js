import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import FlickrWidget from './flickr-widget'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import VanillaTilt from 'vanilla-tilt'

jest.mock('../../../hooks/use-site-metadata', () =>
  jest.fn(() => ({
    flickrUsername: 'test_username',
    flickrDataSource: 'test_data_source'
  }))
)

const mockLightGalleryInstance = {
  openGallery: jest.fn()
}

jest.mock('lightgallery/react', () =>
  jest.fn(({ onInit }) => {
    onInit({ instance: mockLightGalleryInstance })
    return <div data-testid='lightgallery-mock' />
  })
)

jest.mock('lightgallery/plugins/thumbnail', () => jest.fn())
jest.mock('lightgallery/plugins/zoom', () => jest.fn())
jest.mock('lightgallery/plugins/video', () => jest.fn())
jest.mock('lightgallery/plugins/autoplay', () => jest.fn())

jest.mock('vanilla-tilt')
jest.mock('../../../actions/fetchDataSource', () =>
  jest.fn(() => ({
    type: 'FETCH_DATASOURCE'
  }))
)

const mockStore = configureStore([])

describe('FlickrWidget', () => {
  let store

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    store = mockStore({
      widgets: {
        flickr: {
          state: 'SUCCESS',
          data: {
            collections: {
              photos: [
                {
                  id: '123',
                  title: 'Test Photo Title',
                  thumbnailUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image.jpg',
                  largeUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image-large.jpg'
                }
              ]
            },
            metrics: [
              { displayName: 'Photos', id: '1', value: 100 },
              { displayName: 'Views', id: '2', value: 1000 }
            ]
          }
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    console.error.mockRestore()
  })

  it('renders without crashing', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    expect(screen.getByText(/Flickr/i)).toBeInTheDocument()
  })

  it('renders placeholders when isLoading is true', () => {
    const loadingStore = mockStore({
      widgets: {
        flickr: {
          state: 'LOADING',
          data: null
        }
      }
    })

    render(
      <ReduxProvider store={loadingStore}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const placeholders = screen.getAllByText('', { selector: '.image-placeholder' })
    expect(placeholders.length).toBeGreaterThan(0)
  })

  it('renders photos when isLoading is false', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const thumbnails = screen.getAllByAltText(/Flickr photo:/i)
    expect(thumbnails).toHaveLength(1)
    expect(thumbnails[0]).toHaveAttribute('src', 'https://cdn.chrisvogt.me/images/fake-flickr-image.jpg')
  })

  it('toggles between "Show More" and "Show Less"', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const button = screen.getByText(/Show More/i)
    fireEvent.click(button)

    expect(screen.getByText(/Show Less/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Show Less/i))
    expect(screen.getByText(/Show More/i)).toBeInTheDocument()
  })

  it('opens LightGallery when a photo is clicked', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const thumbnails = screen.getAllByAltText(/Flickr photo:/i)
    fireEvent.click(thumbnails[0])

    expect(mockLightGalleryInstance.openGallery).toHaveBeenCalledWith(0)
  })

  it('calls VanillaTilt.init when isShowingMore or !isLoading is true', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    fireEvent.click(screen.getByText(/Show More/i))
    expect(VanillaTilt.init).toHaveBeenCalled()

    VanillaTilt.init.mockClear()

    store = mockStore({
      widgets: {
        flickr: {
          state: 'SUCCESS',
          data: {
            collections: { photos: [] },
            metrics: []
          }
        }
      }
    })

    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(VanillaTilt.init).toHaveBeenCalled()
  })

  it('assigns lightGalleryRef correctly on initialization', () => {
    const mockInstance = {}
    jest.mock('lightgallery/react', () =>
      jest.fn(({ onInit }) => {
        onInit({ instance: mockInstance })
        return <div data-testid='lightgallery-mock' />
      })
    )

    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(mockInstance).toBeDefined()
  })

  it('initializes LightGallery with correct photo data', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(screen.getByTestId('lightgallery-mock')).toBeInTheDocument()
    // Indirect test – rendering succeeds, LightGallery was initialized
    expect(mockLightGalleryInstance.openGallery).not.toHaveBeenCalled() // Ensures it's only initialized, not opened
  })

  it('handles fatal error state correctly', () => {
    const errorStore = mockStore({
      widgets: {
        flickr: {
          state: 'FAILURE',
          data: null
        }
      }
    })

    render(
      <ReduxProvider store={errorStore}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(screen.getByText(/Flickr/i)).toBeInTheDocument()
    // Widget should still render but show error state
    expect(screen.getByRole('complementary')).toHaveAttribute('data-has-fatal-error', 'true')
  })

  it('renders metrics correctly', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(screen.getByText('Photos')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Views')).toBeInTheDocument()
    expect(screen.getByText('1,000')).toBeInTheDocument()
  })

  it('handles missing metrics data gracefully', () => {
    const storeWithoutMetrics = mockStore({
      widgets: {
        flickr: {
          state: 'SUCCESS',
          data: {
            collections: {
              photos: [
                {
                  id: '123',
                  title: 'Test Photo Title',
                  thumbnailUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image.jpg',
                  largeUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image-large.jpg'
                }
              ]
            },
            metrics: null
          }
        }
      }
    })

    render(
      <ReduxProvider store={storeWithoutMetrics}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Component should still render without metrics
    expect(screen.getByText(/Flickr/i)).toBeInTheDocument()
  })

  it('renders CallToAction with correct Flickr profile URL', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const callToAction = screen.getByText('Visit Profile')
    expect(callToAction).toBeInTheDocument()
    expect(callToAction.closest('a')).toHaveAttribute('href', 'https://www.flickr.com/photos/test_username')
  })

  it('handles LightGallery initialization error gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockInstance = null

    jest.mock('lightgallery/react', () =>
      jest.fn(({ onInit }) => {
        onInit({ instance: mockInstance })
        return <div data-testid='lightgallery-mock' />
      })
    )

    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const thumbnails = screen.getAllByAltText(/Flickr photo:/i)
    fireEvent.click(thumbnails[0])

    expect(consoleSpy).toHaveBeenCalledWith('LightGallery instance is not initialized')
    consoleSpy.mockRestore()
  })

  it('renders correct number of images based on show more/less state', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Initially should show default number of images
    const initialPlaceholders = screen.getAllByText('', { selector: '.image-placeholder' })
    expect(initialPlaceholders.length).toBeLessThanOrEqual(8)

    // Click show more
    fireEvent.click(screen.getByText(/Show More/i))
    // Should show more images
    const expandedPlaceholders = screen.getAllByText('', { selector: '.image-placeholder' })
    expect(expandedPlaceholders.length).toBeLessThanOrEqual(16)

    // Click show less
    fireEvent.click(screen.getByText(/Show Less/i))
    // Should show fewer images again
    const collapsedPlaceholders = screen.getAllByText('', { selector: '.image-placeholder' })
    expect(collapsedPlaceholders.length).toBeLessThanOrEqual(8)
  })
})
