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
    expect(img).toHaveAttribute(
      'src',
      `${defaultProps.post.cdnMediaURL}?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format`
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

  it('does not display any icon for unknown mediaType', () => {
    const unknownMediaTypeProps = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        mediaType: 'UNKNOWN_TYPE'
      }
    }

    render(<InstagramWidgetItem {...unknownMediaTypeProps} />)

    const carouselIcon = screen.queryByTestId('carousel-icon')
    const videoIcon = screen.queryByTestId('video-icon')
    expect(carouselIcon).not.toBeInTheDocument()
    expect(videoIcon).not.toBeInTheDocument()
  })

  it('renders correctly when caption is missing', () => {
    const noCaptionProps = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        caption: undefined
      }
    }

    render(<InstagramWidgetItem {...noCaptionProps} />)

    const img = screen.getByAltText('Instagram post thumbnail')
    expect(img).toBeInTheDocument()
  })

  it('renders correctly when cdnMediaURL is missing', () => {
    const noCdnMediaURLProps = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        cdnMediaURL: undefined
      }
    }

    render(<InstagramWidgetItem {...noCdnMediaURLProps} />)

    const img = screen.getByAltText('Instagram post thumbnail')
    expect(img).toHaveAttribute('src', '?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format')
  })

  it('calls onFocus when the button gains focus', () => {
    const mockOnFocus = jest.fn()
    render(<InstagramWidgetItem {...defaultProps} onFocus={mockOnFocus} />)

    const button = screen.getByRole('button')
    fireEvent.focus(button)

    expect(mockOnFocus).toHaveBeenCalledTimes(1)
  })

  it('calls onBlur when the button loses focus', () => {
    const mockOnBlur = jest.fn()
    render(<InstagramWidgetItem {...defaultProps} onBlur={mockOnBlur} />)

    const button = screen.getByRole('button')
    fireEvent.blur(button)

    expect(mockOnBlur).toHaveBeenCalledTimes(1)
  })
})
