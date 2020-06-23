import React from 'react'
import renderer from 'react-test-renderer'

import PinnedItems from './pinned-items'

const mockPinnedItems = [
  {
    __typename: 'Repository',
    id: 'null-js',
    url: 'https://www.github.com/chrisvogt/null/'
  }
]

describe('Widget/GitHub/PinnedItems', () => {
  describe('snapshots', () => {
    it('matches the placeholder snapshot', () => {
      const tree = renderer.create(<PinnedItems isLoading />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('matches the successful state', () => {
      const tree = renderer
        .create(<PinnedItems pinnedItems={mockPinnedItems} isLoading={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
