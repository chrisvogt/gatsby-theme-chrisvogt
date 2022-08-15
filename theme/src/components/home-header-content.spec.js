import React from 'react'
import renderer from 'react-test-renderer'
import HomeHeaderContent from './home-header-content'

const avatar = 'https://fake-cdn.chrisvogt.me/images/avatar.jpg'
const headline = 'Website Title'
const subhead = 'A cool subtitle for my website'

describe('HomeHeaderContent', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<HomeHeaderContent avatar={avatar} headline={headline} subhead={subhead} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
