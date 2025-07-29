import React from 'react'
import renderer from 'react-test-renderer'

import Header from './header'

describe('Header', () => {
  it('renders with children', () => {
    const tree = renderer
      .create(
        <Header>
          <h1>Test Header</h1>
        </Header>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with custom styles', () => {
    const customStyles = {
      backgroundColor: 'red',
      color: 'white'
    }
    const tree = renderer
      .create(
        <Header styles={customStyles}>
          <h1>Test Header with Styles</h1>
        </Header>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without styles prop', () => {
    const tree = renderer
      .create(
        <Header>
          <h1>Test Header without Styles</h1>
        </Header>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with empty styles object', () => {
    const tree = renderer
      .create(
        <Header styles={{}}>
          <h1>Test Header with Empty Styles</h1>
        </Header>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
