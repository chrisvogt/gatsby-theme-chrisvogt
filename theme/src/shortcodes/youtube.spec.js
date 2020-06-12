import React from 'react'
import renderer from 'react-test-renderer'
import YouTube from './youtube'

describe('YouTube Shortcode', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <YouTube
          title='Here, There And Everywhere (Piano Cover) by Chris Vogt'
          url='https://www.youtube-nocookie.com/embed/XJashBvI17A'
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
