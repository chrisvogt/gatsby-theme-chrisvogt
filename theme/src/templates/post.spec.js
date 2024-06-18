import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'

import Post from './post'

const data = {
  mdx: {
    fields: {
      category: 'Mock Category',
      title: 'A Mock Blog Post'
    },
    frontmatter: {
      date: 'Mon, 17 Jun 2024 03:30:26 GMT',
    }
  }
}

jest.mock('gatsby');
jest.mock('../components/layout', () => {
  return ({children}) => <div className='layoutMock'>{children}</div>
});

jest.mock('../components/seo', () => {
  return ({children}) => <div className='seoMock'>{children}</div>
});

const BlogPostContent = <div>Lorum ipsum dolor sit amet.</div>;

describe('Blog Post', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const tree = renderer.create(<Post data={ data } children={ BlogPostContent } />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
