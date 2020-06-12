import React from 'react'
import Placeholder from './placeholder'
import renderer from 'react-test-renderer'

describe('GitHub Placeholder Renderer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Placeholder />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
