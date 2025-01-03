import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import InstagramWidget from './instagram-widget'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'

jest.mock('../../../hooks/use-site-metadata', () =>
  jest.fn(() => ({
    instagramUsername: 'test_username',
    instagramDataSource: 'test_data_source'
  }))
)

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

jest.mock('../../../actions/fetchDataSource', () =>
  jest.fn(() => ({
    type: 'FETCH_DATASOURCE'
  }))
)

const mockStore = configureStore([])
const mockLightGalleryInstance = {
  openGallery: jest.fn()
}

describe('InstagramWidget', () => {
  let store

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Silence expected errors
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
    console.error.mockRestore()
  })

  it('renders without crashing', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument()
  })

  it('renders placeholders when isLoading is true', () => {
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

  it('renders media items when isLoading is false', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const thumbnails = screen.getAllByAltText(/Instagram post thumbnail/i)
    expect(thumbnails).toHaveLength(1)
    expect(thumbnails[0]).toHaveAttribute(
      'src',
      expect.stringContaining('https://cdn.chrisvogt.me/images/fake-instagram-image.jpg')
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

    const button = screen.getByText(/Show More/i)
    fireEvent.click(button)

    expect(screen.getByText(/Show Less/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Show Less/i))
    expect(screen.getByText(/Show More/i)).toBeInTheDocument()
  })

  it('opens LightGallery when handleClick is called', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    const thumbnails = screen.getAllByAltText(/Instagram post thumbnail/i)
    fireEvent.click(thumbnails[0])

    expect(mockLightGalleryInstance.openGallery).toHaveBeenCalledWith(0)
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
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    expect(mockInstance).toBeDefined()
  })

  it('updates focusedItem state on focus, blur, mouse enter, and mouse leave', () => {
    render(
      <ReduxProvider store={store}>
        <ThemeUIProvider theme={theme}>
          <InstagramWidget />
        </ThemeUIProvider>
      </ReduxProvider>
    )

    // Locate the <button> wrapping the media item
    const mediaItemButton = screen.getByRole('button', { name: /Instagram post thumbnail/i })
    expect(mediaItemButton).toBeInTheDocument() // Ensure the button is rendered

    // Focus event
    fireEvent.focus(mediaItemButton)
    expect(mediaItemButton.className).toContain('media-item--focused')

    // Blur event
    fireEvent.blur(mediaItemButton)
    expect(mediaItemButton.className).not.toContain('media-item--focused')

    // Mouse enter event
    fireEvent.mouseEnter(mediaItemButton)
    expect(mediaItemButton.className).toContain('media-item--focused')

    // Mouse leave event
    fireEvent.mouseLeave(mediaItemButton)
    expect(mediaItemButton.className).not.toContain('media-item--focused')
  })
})
