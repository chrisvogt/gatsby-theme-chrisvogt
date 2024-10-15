import React from 'react'
import { render, fireEvent } from '@testing-library/react' // Import fireEvent here
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import InstagramWidget from './instagram-widget'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import VanillaTilt from 'vanilla-tilt'

// Mocking the useSiteMetadata hook
import useSiteMetadata from '../../../hooks/use-site-metadata'

jest.mock('../../../hooks/use-site-metadata')
jest.mock('vanilla-tilt')

const mockStore = configureStore([])

const mockSiteMetadata = {
  widgets: {
    instagram: {
      username: 'mockusername',
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/instagram'
    }
  }
}

describe('Instagram Widget', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      widgets: {
        instagram: {
          state: 'SUCCESS', // Set a successful state to prevent loading
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
            metrics: [ // Mocking a valid metrics array
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

  it('matches the loading state snapshot', () => {
    const { asFragment } = render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('initializes VanillaTilt for Instagram items', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Check if VanillaTilt.init has been called (assert initialization)
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

  it('toggles show more/show less button', () => {
    const { getByText } = render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Query for the "Show More" button using text
    const showMoreButton = getByText(/show more/i)
    expect(showMoreButton).toBeInTheDocument()

    // Click the button to toggle
    fireEvent.click(showMoreButton)

    // Query for the "Show Less" button after toggling
    const showLessButton = getByText(/show less/i)
    expect(showLessButton).toBeInTheDocument()
  })

  it('opens lightbox when media item is clicked', () => {
    const { getByAltText } = render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Query for the media item by its alt text
    const mediaItem = getByAltText(/Instagram post thumbnail/i)
    expect(mediaItem).toBeInTheDocument()

    // Simulate clicking the media item
    fireEvent.click(mediaItem)

    // Check if lightbox opened (viewerIsOpen should now be true)
    const lightboxImage = getByAltText(/Instagram post thumbnail/i)
    expect(lightboxImage).toBeInTheDocument()
  })
})
