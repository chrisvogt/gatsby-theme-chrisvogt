import React from 'react'
import renderer from 'react-test-renderer'
import CallToAction from './call-to-action'

describe('CallToAction', () => {
  it('renders correctly', () => {
    const title = 'Example Widget Title'
    const tree = renderer
      .create(
        <CallToAction title={title} isLoading={false}>
          Test
        </CallToAction>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
