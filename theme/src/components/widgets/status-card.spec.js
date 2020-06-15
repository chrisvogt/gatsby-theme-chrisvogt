import React from 'react'
import renderer from 'react-test-renderer'
import StatusCard from './status-card'

describe('StatusCard', () => {
  it('matches the snapshot', () => {
    const message = 'Lorum ipsum dolor sit amet.'
    const tree = renderer.create(<StatusCard>{message}</StatusCard>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
