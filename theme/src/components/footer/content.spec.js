import React from 'react'
import renderer from 'react-test-renderer'
import Content from './Content'
import Profiles from './profiles'

jest.mock('./profiles')

describe('Footer/Content', () => {
  Profiles.mockImplementation(() => <div className='MOCK__Profiles'></div>)
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Content
          footerText='© 2019-2020 Chris Vogt'
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
