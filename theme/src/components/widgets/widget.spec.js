import React from 'react'
import renderer from 'react-test-renderer'
import Widget from './widget'

describe('Widget', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Widget>Test</Widget>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('sets the widget id attribute when provided', () => {
    const id = 'fake-widget'
    const testRenderer = renderer.create(<Widget id={id}>Test</Widget>)
    const testInstance = testRenderer.root
    expect(testInstance.findByType('section').props.id).toEqual(id)
  })
})
