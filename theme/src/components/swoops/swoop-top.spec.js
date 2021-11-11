import React from 'react'
import renderer from 'react-test-renderer'
import SwoopTop from './swoop-top'
import { TestProvider } from '../../testUtils'

const WrappedSwoop = props => (
  <TestProvider>
    <SwoopTop {...props} />
  </TestProvider>
)

describe('SwoopTop', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<WrappedSwoop />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
