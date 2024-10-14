import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'

import Post, { Head } from './post'

const data = {
  mdx: {
    fields: {
      category: 'Mock Category',
    },
    frontmatter: {
      date: 'Mon, 17 Jun 2024 03:30:26 GMT',
      title: 'A Mock Blog Post',
      description: 'This is a mock description',
      banner: 'mock-banner.jpg',
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
    const tree = renderer.create(<Post data={ data }>{ BlogPostContent }</Post>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not render category when not provided', () => {
    const noCategoryData = {
      ...data,
      mdx: {
        ...data.mdx,
        fields: {
          category: null
        }
      }
    }
    const tree = renderer.create(<Post data={ noCategoryData }>{ BlogPostContent }</Post>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders Seo component with the correct props', () => {
    const seoTree = renderer.create(<Head data={ data } />).toJSON()
    expect(seoTree).toMatchSnapshot()
  })
})
