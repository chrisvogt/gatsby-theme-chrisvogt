import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'

import Media from './media'

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

const MediaPostContent = <div>Lorum ipsum dolor sit amet.</div>;

describe('Media Post', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const tree = renderer.create(<Media data={ data } children={ MediaPostContent } />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
