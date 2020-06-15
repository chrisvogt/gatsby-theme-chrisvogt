import React from 'react'
import renderer from 'react-test-renderer'
import WidgetHeader from './widget-header'

const aside = (
  <div className='sidebar-content'>
    Sidebar
  </div>
)

describe('WidgetHeader', () => {
  it('matches the snapshot', () => {
    const widgetTitle = 'Neat & Interesting Widget'
    const tree = renderer
      .create(<WidgetHeader aside={aside} platform='GitHub'>{widgetTitle}</WidgetHeader>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
