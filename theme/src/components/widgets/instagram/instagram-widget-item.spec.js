import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import InstagramWidgetItem from './instagram-widget-item'

describe('InstagramWidgetItem', () => {
  const mockHandleClick = jest.fn()

  const defaultProps = {
    handleClick: mockHandleClick,
    index: 0,
    post: {
      id: '0123456789',
      caption: 'This is a test caption',
      cdnMediaURL: 'https://cdn.chrisvogt.me/images/fake-instagram-image.jpg',
      mediaType: 'IMAGE',
      permalink: 'https://instagram.com/fake-image-link'
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const { asFragment } = render(<InstagramWidgetItem {...defaultProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the image with correct alt text and source', () => {
    render(<InstagramWidgetItem {...defaultProps} />)

    const img = screen.getByAltText('Instagram post thumbnail')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', `${defaultProps.post.cdnMediaURL}?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format`)
  })

  it('calls handleClick when the button is clicked', () => {
    render(<InstagramWidgetItem {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockHandleClick).toHaveBeenCalledTimes(1)
    expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object), {
      index: defaultProps.index,
      photo: {
        caption: defaultProps.post.caption,
        id: defaultProps.post.id,
        src: defaultProps.post.cdnMediaURL
      }
    })
  })

  it('displays the carousel icon when mediaType is CAROUSEL_ALBUM', () => {
    const carouselProps = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        mediaType: 'CAROUSEL_ALBUM' // Make sure this value is exactly what triggers the isCarousel condition
      }
    }

    render(<InstagramWidgetItem {...carouselProps} />)

    // Debugging: log mediaType to verify it's correct
    console.log('mediaType:', carouselProps.post.mediaType)

    const carouselIcon = screen.getByTestId('carousel-icon')
    expect(carouselIcon).toBeInTheDocument()
  })

  it('does not display the carousel icon when mediaType is not CAROUSEL_ALBUM', () => {
    render(<InstagramWidgetItem {...defaultProps} />)

    const carouselIcon = screen.queryByTestId('carousel-icon')
    expect(carouselIcon).not.toBeInTheDocument()
  })
})
