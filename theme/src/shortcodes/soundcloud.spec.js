import React from 'react'
import renderer from 'react-test-renderer'
import SoundCloud from './soundcloud'

describe('SoundCloud Shortcode', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<SoundCloud soundcloudId='880888540' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a default title if one is not provided', () => {
    const testRenderer = renderer.create(<SoundCloud soundcloudId='880888540' />)
    const testInstance = testRenderer.root
    expect(testInstance.findByType('iframe').props.title).toEqual('Song on SoundCloud')
  })
})
