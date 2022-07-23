import React from 'react'
import renderer from 'react-test-renderer'
import PostCard from './post-card'

describe('PostCard', () => {
  const props = {
    banner: 'https://cdn.chrisvogt.me/images/article-og-banner.jpg',
    category: 'personal',
    date: '1592202624',
    link: '/blog/article',
    title: 'My Blog Post'
  }

  it('matches the snapshot', () => {
    const tree = renderer.create(<PostCard {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
