import React from 'react'
import renderer from 'react-test-renderer'
import Book from './book'

describe('Book', () => {
  const thumbnailURL = 'https://cdn.chrisvogt.me/images/fake-book-cover.jpg'
  const title = 'Fake Book'

  it('matches the snapshot', () => {
    const tree = renderer
      .create(<Book thumbnailURL={thumbnailURL} title={title} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders an image using the image prop', () => {
    const testRenderer = renderer.create(
      <Book thumbnailURL={thumbnailURL} title={title} />
    )
    const testInstance = testRenderer.root

    expect(testInstance.findByType('image').props.xlinkHref).toEqual(
      thumbnailURL
    )
  })
})
