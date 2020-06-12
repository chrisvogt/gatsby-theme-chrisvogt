import React from 'react'
import renderer from 'react-test-renderer'
import MetricCard from './metric-card'

describe('MetricCard', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MetricCard title='Fake Metric' value='Fake Value' ready='true' />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
