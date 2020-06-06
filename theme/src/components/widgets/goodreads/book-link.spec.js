import React from 'react'
import BookLink from './book-link'
import renderer from 'react-test-renderer'

describe('BookLink', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BookLink
          title='The Three-Body Problem'
          infoLink='https://www.google.com/books/edition/_/ZrNzAwAAQBAJ?hl=en'
          thumbnailURL='https://placehold.it/400/400'
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
