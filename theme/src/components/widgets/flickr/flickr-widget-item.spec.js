import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FlickrWidgetItem from './flickr-widget-item'

describe('FlickrWidgetItem', () => {
  const mockHandleClick = jest.fn()

  const defaultProps = {
    handleClick: mockHandleClick,
    index: 0,
    photo: {
      id: '0123456789',
      title: 'Test Photo Title',
      thumbnailUrl: 'https://cdn.chrisvogt.me/images/fake-flickr-image.jpg'
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const { asFragment } = render(<FlickrWidgetItem {...defaultProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the image with correct alt text and source', () => {
    render(<FlickrWidgetItem {...defaultProps} />)

    const img = screen.getByAltText('Flickr photo: Test Photo Title')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', defaultProps.photo.thumbnailUrl)
  })

  it('calls handleClick with the correct index when the button is clicked', () => {
    render(<FlickrWidgetItem {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockHandleClick).toHaveBeenCalledTimes(1)
    expect(mockHandleClick).toHaveBeenCalledWith(defaultProps.index)
  })

  it('handles missing photo data gracefully', () => {
    const propsWithMissingData = {
      handleClick: mockHandleClick,
      index: 0,
      photo: {}
    }

    render(<FlickrWidgetItem {...propsWithMissingData} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'Flickr photo: ')
    expect(img).toHaveAttribute('src', '')
  })
})
