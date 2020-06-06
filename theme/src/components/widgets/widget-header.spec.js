import React from 'react'
import renderer from 'react-test-renderer'
import WidgetHeader from './widget-header'

describe('WidgetHeader', () => {
  it('renders correctly', () => {
    const widgetTitle = 'Neat & Interesting Widget'
    const tree = renderer
      .create(<WidgetHeader platform='GitHub'>{widgetTitle}</WidgetHeader>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
