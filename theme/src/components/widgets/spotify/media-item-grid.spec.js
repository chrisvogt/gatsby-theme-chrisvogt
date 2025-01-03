import React from 'react'
import renderer from 'react-test-renderer'
import MediaItemGrid from './media-item-grid'

const mockItems = [
  {
    id: 'ITEM-1',
    details: 'Item #1',
    spotifyURL: 'https://www.google.com/',
    thumbnailURL: 'http://placekitten.com/200/200'
  }
]

describe('MediaItemGrid', () => {
  it('matches loading state snapshot', () => {
    const tree = renderer.create(<MediaItemGrid isLoading={false} items={mockItems} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches the ready state snapshot state', () => {
    const tree = renderer.create(<MediaItemGrid isLoading={true} items={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
