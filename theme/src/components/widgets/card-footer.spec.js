import React from 'react'
import renderer from 'react-test-renderer'
import CardFooter from './card-footer'

describe('CardFooter', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CardFooter>Test</CardFooter>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
