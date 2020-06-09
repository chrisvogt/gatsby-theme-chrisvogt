import React from 'react'
import renderer from 'react-test-renderer'
import Widget from './widget'

describe('Widget', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Widget id='fake-widget'>Test</Widget>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
