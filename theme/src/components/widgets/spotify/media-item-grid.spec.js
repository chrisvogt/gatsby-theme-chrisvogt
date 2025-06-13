import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MediaItemGrid from './media-item-grid'

const mockItems = [
  {
    id: 'ITEM-1',
    details: 'Item #1',
    name: 'Test Item 1',
    spotifyURL: 'https://www.google.com/',
    thumbnailURL: 'http://placekitten.com/200/200'
  },
  {
    id: 'ITEM-2',
    details: 'Item #2',
    spotifyURL: 'https://www.google.com/',
    thumbnailURL: 'http://placekitten.com/200/200'
  }
]

describe('MediaItemGrid', () => {
  it('matches loading state snapshot', () => {
    const { container } = render(<MediaItemGrid isLoading={true} items={[]} />)
    expect(container).toMatchSnapshot()
  })

  it('matches the ready state snapshot', () => {
    const { container } = render(<MediaItemGrid isLoading={false} items={mockItems} />)
    expect(container).toMatchSnapshot()
  })

  it('renders loading placeholders when isLoading is true', () => {
    render(<MediaItemGrid isLoading={true} items={[]} />)
    const placeholders = document.querySelectorAll('.show-loading-animation')
    expect(placeholders).toHaveLength(12) // Default number of placeholders
  })

  it('renders items when not loading', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(mockItems.length)
    expect(links[0]).toHaveAttribute('href', mockItems[0].spotifyURL)
    expect(links[0]).toHaveAttribute('title', mockItems[0].details)
  })

  it('handles mouse enter/leave interactions', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)
    const firstItem = screen.getAllByRole('link')[0]
    // Initial state
    expect(firstItem).not.toHaveClass('media-item--focused')
    expect(document.querySelector('.media-item_grid')).not.toHaveClass('media-item_grid--interacting')
    // Mouse enter
    fireEvent.mouseEnter(firstItem)
    expect(firstItem).toHaveClass('media-item--focused')
    expect(document.querySelector('.media-item_grid')).toHaveClass('media-item_grid--interacting')
    // Mouse leave
    fireEvent.mouseLeave(firstItem)
    expect(firstItem).not.toHaveClass('media-item--focused')
    expect(document.querySelector('.media-item_grid')).not.toHaveClass('media-item_grid--interacting')
  })

  it('renders item names when provided', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)
    const captions = document.querySelectorAll('.media-item_caption')
    // Only items with a name prop should render a caption
    const itemsWithName = mockItems.filter(item => item.name)
    expect(captions).toHaveLength(itemsWithName.length)
    expect(captions[0]).toHaveTextContent(itemsWithName[0].name)
  })

  it('handles empty items array', () => {
    render(<MediaItemGrid isLoading={false} items={[]} />)
    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  it('renders images with correct attributes', () => {
    render(<MediaItemGrid isLoading={false} items={mockItems} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(mockItems.length)
    expect(images[0]).toHaveAttribute('alt', 'cover artwork')
    expect(images[0]).toHaveAttribute('crossOrigin', 'anonymous')
    expect(images[0]).toHaveAttribute('loading', 'lazy')
    expect(images[0]).toHaveAttribute('src', mockItems[0].thumbnailURL)
  })
})
