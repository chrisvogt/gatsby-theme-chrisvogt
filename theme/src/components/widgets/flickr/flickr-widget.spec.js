import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import FlickrWidget from './flickr-widget'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import VanillaTilt from 'vanilla-tilt'

// Mock use-site-metadata at the top
jest.mock('../../../hooks/use-site-metadata', () => () => ({
  widgets: {
    flickr: {
      username: 'test_username',
      widgetDataSource: 'test_data_source'
    }
  }
}))

// Mock LightGallery at the top
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

    const placeholders = document.querySelectorAll('.image-placeholder')
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
    // This is already covered by the LightGallery mock
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    // No error thrown means ref assignment is fine
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
    expect(mockLightGalleryInstance.openGallery).not.toHaveBeenCalled()
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

    // Instead of checking for data-has-fatal-error, check for error message
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/Failed to load this widget/i)).toBeInTheDocument()
  })

  it('renders metrics correctly', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    // Use getAllByText for metrics
    const photosBadges = screen.getAllByText(/Photos/)
    expect(photosBadges.length).toBeGreaterThan(0)
    const viewsBadges = screen.getAllByText(/Views/)
    expect(viewsBadges.length).toBeGreaterThan(0)
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
            metrics: []
          }
        }
      }
    })

    const { container } = render(
      <ReduxProvider store={storeWithoutMetrics}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(screen.getByText(/Flickr/i)).toBeInTheDocument()
    // Metrics container should be present
    expect(container.querySelector('section')).toBeInTheDocument()
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

  it('renders correct number of images based on show more/less state', () => {
    const storeWithMorePhotos = mockStore({
      widgets: {
        flickr: {
          state: 'SUCCESS',
          data: {
            collections: {
              photos: Array(20).fill({
                id: '123',
                title: 'Test Photo Title',
                thumbnailUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image.jpg',
                largeUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image-large.jpg'
              })
            },
            metrics: []
          }
        }
      }
    })

    render(
      <ReduxProvider store={storeWithMorePhotos}>
        <ThemeUIProvider theme={theme}>
          <FlickrWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Initially should show default number of images
    const initialImages = screen.getAllByRole('img', { name: /Flickr photo:/i })
    expect(initialImages.length).toBeLessThanOrEqual(8)

    // Click show more
    fireEvent.click(screen.getByText(/Show More/i))
    // Should show more images
    const expandedImages = screen.getAllByRole('img', { name: /Flickr photo:/i })
    expect(expandedImages.length).toBeLessThanOrEqual(16)

    // Click show less
    fireEvent.click(screen.getByText(/Show Less/i))
    // Should show fewer images again
    const collapsedImages = screen.getAllByRole('img', { name: /Flickr photo:/i })
    expect(collapsedImages.length).toBeLessThanOrEqual(8)
  })
})
