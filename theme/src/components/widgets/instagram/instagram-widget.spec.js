import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import InstagramWidget from './instagram-widget'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import VanillaTilt from 'vanilla-tilt'

// Mock the useSiteMetadata hook
jest.mock('../../../hooks/use-site-metadata', () =>
  jest.fn(() => ({
    instagramUsername: 'test_username',
    instagramDataSource: 'test_data_source'
  }))
)

// Mock lightgallery/react and its plugins
jest.mock('lightgallery/react', () => jest.fn(() => <div data-testid='lightgallery-mock' />))
jest.mock('lightgallery/plugins/thumbnail', () => jest.fn())
jest.mock('lightgallery/plugins/zoom', () => jest.fn())
jest.mock('lightgallery/plugins/video', () => jest.fn())
jest.mock('lightgallery/plugins/autoplay', () => jest.fn())

// Mock VanillaTilt
jest.mock('vanilla-tilt')

// Mock fetchDataSource
jest.mock('../../../actions/fetchDataSource', () =>
  jest.fn(() => ({
    type: 'FETCH_DATASOURCE'
  }))
)

const mockStore = configureStore([])

describe('InstagramWidget', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      widgets: {
        instagram: {
          state: 'SUCCESS',
          data: {
            collections: {
              media: [
                {
                  id: '123',
                  caption: 'Test Caption',
                  cdnMediaURL: 'https://cdn.chrisvogt.me/images/fake-instagram-image.jpg',
                  mediaType: 'IMAGE',
                  permalink: 'https://instagram.com/p/test'
                }
              ]
            },
            metrics: [
              { displayName: 'Followers', id: '1', value: 100 },
              { displayName: 'Following', id: '2', value: 50 }
            ]
          }
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the gallery with mocked lightgallery', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const lightgalleryMock = screen.getByTestId('lightgallery-mock')
    expect(lightgalleryMock).toBeInTheDocument()
  })

  it('initializes VanillaTilt for Instagram items', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(VanillaTilt.init).toHaveBeenCalledTimes(1)
    expect(VanillaTilt.init).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        glare: true,
        max: 21,
        perspective: 1500,
        reverse: true,
        speed: 300
      })
    )
  })

  it('toggles between "Show More" and "Show Less"', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const showMoreButton = screen.getByText(/show more/i)
    expect(showMoreButton).toBeInTheDocument()

    fireEvent.click(showMoreButton)

    const showLessButton = screen.getByText(/show less/i)
    expect(showLessButton).toBeInTheDocument()
  })

  it('opens the lightbox when media item is clicked', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const mediaItem = screen.getByAltText(/Instagram post thumbnail/i)
    expect(mediaItem).toBeInTheDocument()

    fireEvent.click(mediaItem)

    const lightboxMock = screen.getByTestId('lightgallery-mock')
    expect(lightboxMock).toBeInTheDocument()
  })

  it('dispatches fetchDataSource on load if in loading state', () => {
    const loadingStore = mockStore({
      widgets: {
        instagram: {
          state: 'LOADING',
          data: null
        }
      }
    })

    render(
      <ReduxProvider store={loadingStore}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const actions = loadingStore.getActions()
    expect(actions).toContainEqual({
      type: 'FETCH_DATASOURCE'
    })
  })

  it('renders error message if hasFatalError is true', () => {
    const errorStore = mockStore({
      widgets: {
        instagram: {
          state: 'FAILURE',
          data: null
        }
      }
    })

    render(
      <ReduxProvider store={errorStore}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
