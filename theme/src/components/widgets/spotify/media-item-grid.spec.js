import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MediaItemGrid from './media-item-grid'

const mockItems = [
  {
    id: 'ITEM-1',
    details: 'Item #1',
    spotifyURL: 'https://www.google.com/',
    thumbnailURL: 'http://placekitten.com/200/200'
  },
  {
    id: 'ITEM-2',
    details: 'Item #2',
    spotifyURL: 'https://www.example.com/',
    thumbnailURL: 'http://placekitten.com/300/300'
  }
]

describe('MediaItemGrid', () => {
  it('matches loading state snapshot', () => {
    const { asFragment } = render(<MediaItemGrid isLoading={true} items={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches the ready state snapshot', () => {
    const { asFragment } = render(<MediaItemGrid isLoading={false} items={mockItems} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('handles onFocus and onBlur correctly', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)

    const link = screen.getByTitle('Item #1')
    expect(link).toBeInTheDocument()

    // Trigger focus
    fireEvent.focus(link)
    expect(link).toHaveClass('media-item--focused')

    // Trigger blur
    fireEvent.blur(link)
    expect(link).not.toHaveClass('media-item--focused')
  })

  it('handles onMouseEnter and onMouseLeave correctly', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)

    const link = screen.getByTitle('Item #1')
    expect(link).toBeInTheDocument()

    // Trigger mouse enter
    fireEvent.mouseEnter(link)
    expect(link).toHaveClass('media-item--focused')

    // Trigger mouse leave
    fireEvent.mouseLeave(link)
    expect(link).not.toHaveClass('media-item--focused')
  })
})
