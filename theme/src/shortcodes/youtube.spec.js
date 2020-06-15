import React from 'react'
import renderer from 'react-test-renderer'
import YouTube from './youtube'

describe('YouTube Shortcode', () => {
  it('matches the snapshot', () => {
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

  it('renders a default title if one is not provided', () => {
    const testRenderer = renderer.create(
      <YouTube url='https://www.youtube-nocookie.com/embed/XJashBvI17A' />
    )
    const testInstance = testRenderer.root
    expect(testInstance.findByType('iframe').props.title).toEqual('YouTube video')
  })
})
