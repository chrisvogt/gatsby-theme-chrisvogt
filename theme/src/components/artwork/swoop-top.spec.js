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

  it('passes the fill prop to the SVG path', () => {
    const fill = '#ff4600'
    const testRenderer = renderer.create(<WrappedSwoop fill={fill} />)
    const testInstance = testRenderer.root

    expect(testInstance.findByType('path').props.fill).toEqual(fill)
  })
})
