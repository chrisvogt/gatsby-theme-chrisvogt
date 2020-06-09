import React from 'react'
import renderer from 'react-test-renderer'
import TrackPreview from './track-preview'

describe('TrackPreview', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TrackPreview
          link='https://www.fake-book-website.com/book-example'
          name='Fake Song'
          thumbnailURL='https://placehold.it/400/400'
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
