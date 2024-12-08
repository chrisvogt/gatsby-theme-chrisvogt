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

  it('does not dispatch fetchDataSource when isLoading is false', () => {
    const notLoadingStore = mockStore({
      widgets: {
        instagram: {
          state: 'SUCCESS',
          data: {
            collections: { media: [] },
            metrics: []
          }
        }
      }
    })

    render(
      <ReduxProvider store={notLoadingStore}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const actions = notLoadingStore.getActions()
    expect(actions).not.toContainEqual({ type: 'FETCH_DATASOURCE' })
  })

  it('renders placeholder content when isLoading is true', () => {
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

    const placeholders = screen.getAllByText('', { selector: '.image-placeholder' })
    expect(placeholders.length).toBeGreaterThan(0)
  })

  it('calls VanillaTilt.init when isShowingMore is true', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    fireEvent.click(screen.getByText(/show more/i))
    expect(VanillaTilt.init).toHaveBeenCalled()
  })

  it('does not call VanillaTilt.init when both isShowingMore and !isLoading are false', () => {
    // Mock store with isLoading set to true
    const loadingStore = mockStore({
      widgets: {
        instagram: {
          state: 'LOADING', // Simulate loading state
          data: {
            collections: { media: [] },
            metrics: []
          }
        }
      }
    })

    // Clear any previous calls to VanillaTilt
    VanillaTilt.init.mockClear()

    // Render the component
    render(
      <ReduxProvider store={loadingStore}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Validate that VanillaTilt.init was not called
    expect(VanillaTilt.init).not.toHaveBeenCalled()
  })

  it('toggles between show more and show less states', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const showMoreButton = screen.getByText(/show more/i)
    fireEvent.click(showMoreButton)
    expect(screen.getByText(/show less/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/show less/i))
    expect(screen.getByText(/show more/i)).toBeInTheDocument()
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
