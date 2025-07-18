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
      cdnMediaURL: 'https://cdn.example.com/images/fake-instagram-image.jpg',
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

    const img = screen.getByAltText(`Instagram post: ${defaultProps.post.caption}`)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      `${defaultProps.post.cdnMediaURL}?h=234&w=234&fit=crop&crop=faces,focalpoint&auto=compress&auto=enhance&auto=format`
    )
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
        mediaType: 'CAROUSEL_ALBUM'
      }
    }

    render(<InstagramWidgetItem {...carouselProps} />)

    const carouselIcon = screen.getByTestId('carousel-icon')
    expect(carouselIcon).toBeInTheDocument()
  })

  it('displays the video icon when mediaType is VIDEO', () => {
    const videoProps = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        mediaType: 'VIDEO'
      }
    }

    render(<InstagramWidgetItem {...videoProps} />)

    const videoIcon = screen.getByTestId('video-icon')
    expect(videoIcon).toBeInTheDocument()
  })

  it('does not display any icon when mediaType is IMAGE', () => {
    render(<InstagramWidgetItem {...defaultProps} />)

    const carouselIcon = screen.queryByTestId('carousel-icon')
    const videoIcon = screen.queryByTestId('video-icon')
    expect(carouselIcon).not.toBeInTheDocument()
    expect(videoIcon).not.toBeInTheDocument()
  })
})
