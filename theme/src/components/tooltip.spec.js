import React from 'react'
import renderer from 'react-test-renderer'

import Tooltip from './tooltip'

const DemoContent = () => (
  <div className='demo-content'>
    <span>I'm inside a tooltip!</span>
  </div>
)

describe('Tooltip', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Tooltip
          tooltip={DemoContent}
          hideArrow
        >
          Trigger element
        </Tooltip>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
