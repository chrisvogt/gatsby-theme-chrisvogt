import React from 'react'
import Placeholder from './placeholder'
import renderer from 'react-test-renderer'

describe('GitHub Placeholder Renderer', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Placeholder />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
