import React from 'react'
import renderer from 'react-test-renderer'
import SwoopBottom from './swoop-bottom'
import { TestProvider } from '../../testUtils'

const WrappedSwoopBottom = props => (
  <TestProvider>
    <SwoopBottom {...props} />
  </TestProvider>
)

describe('SwoopBottom', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<WrappedSwoopBottom />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('passes the fill prop to the SVG path', () => {
    const fill = '#ff4600'
    const testRenderer = renderer.create(<WrappedSwoopBottom fill={fill} />)
    const testInstance = testRenderer.root

    expect(testInstance.findByType('path').props.fill).toEqual(fill)
  })
})
