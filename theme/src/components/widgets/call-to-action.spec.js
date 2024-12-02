import React from 'react'
import renderer from 'react-test-renderer'
import { Bars } from 'svg-loaders-react'
import CallToAction from './call-to-action'

describe('CallToAction', () => {
  const title = 'Example Widget Title'

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <CallToAction title={title} isLoading={false}>
          Test
        </CallToAction>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('loading indicator', () => {
    it("doesn't a loading indicator by default", () => {
      const testRenderer = renderer.create(<CallToAction title={title}>Test</CallToAction>)
      const testInstance = testRenderer.root
      expect(testInstance.findAllByType(Bars)).toHaveLength(0)
    })

    it('renders a loading indicator', () => {
      const testRenderer = renderer.create(
        <CallToAction title={title} isLoading>
          Test
        </CallToAction>
      )
      const testInstance = testRenderer.root
      expect(testInstance.findAllByType(Bars)).toHaveLength(1)
    })
  })

  describe('hyperlink vs Gatsby Router links', () => {
    it('renders a hyperlink by default', () => {
      const href = 'https://fake-link.com/my-profile'
      const testRenderer = renderer.create(
        <CallToAction title='My Profile' url={href}>
          Visit profile
        </CallToAction>
      )
      const testInstance = testRenderer.root
      const hyperlinkEl = testInstance.findByType('a')
      expect(!!hyperlinkEl.props.onClick).toBe(false)
      expect(hyperlinkEl.props.href).toBe(href)
    })

    it('renders a Gatsby Router link', () => {
      const route = '/about-me'
      const testRenderer = renderer.create(
        <CallToAction title={title} to={route}>
          Learn more about me
        </CallToAction>
      )
      const testInstance = testRenderer.root
      const hyperlinkEl = testInstance.findByType('a')
      expect(!!hyperlinkEl.props.onClick).toBe(true)
      expect(hyperlinkEl.props.href).toBe(route)
    })
  })
})
