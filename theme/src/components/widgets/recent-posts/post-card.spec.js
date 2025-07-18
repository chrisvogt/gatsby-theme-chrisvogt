import React from 'react'
import renderer from 'react-test-renderer'
import PostCard from './post-card'

describe('PostCard', () => {
  const baseProps = {
    banner: 'https://cdn.example.com/images/article-og-banner.jpg',
    category: 'personal',
    date: '1592202624',
    link: '/blog/article',
    title: 'My Blog Post'
  }

  it('matches the snapshot without excerpt', () => {
    const tree = renderer.create(<PostCard {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders excerpt when provided', () => {
    const propsWithExcerpt = {
      ...baseProps,
      excerpt: 'This is a sample excerpt for the blog post.'
    }
    const tree = renderer.create(<PostCard {...propsWithExcerpt} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not render excerpt when explicitly null', () => {
    const propsWithNullExcerpt = {
      ...baseProps,
      excerpt: null
    }
    const tree = renderer.create(<PostCard {...propsWithNullExcerpt} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not render excerpt when explicitly undefined', () => {
    const propsWithUndefinedExcerpt = {
      ...baseProps,
      excerpt: undefined
    }
    const tree = renderer.create(<PostCard {...propsWithUndefinedExcerpt} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without banner when not provided', () => {
    const propsWithoutBanner = {
      category: 'personal',
      date: '1592202624',
      link: '/blog/article',
      title: 'My Blog Post'
    }
    const tree = renderer.create(<PostCard {...propsWithoutBanner} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without category when not provided', () => {
    const propsWithoutCategory = {
      banner: 'https://cdn.example.com/images/article-og-banner.jpg',
      date: '1592202624',
      link: '/blog/article',
      title: 'My Blog Post'
    }
    const tree = renderer.create(<PostCard {...propsWithoutCategory} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('specifically tests excerpt prop handling for blog page change', () => {
    // This test specifically addresses the user's change where excerpt was commented out
    const propsWithoutExcerpt = {
      ...baseProps
      // excerpt is intentionally not included, simulating the commented out line
    }

    const component = renderer.create(<PostCard {...propsWithoutExcerpt} />)
    const tree = component.toJSON()

    // Verify that no excerpt paragraph is rendered
    const excerptParagraph = findExcerptParagraph(tree)
    expect(excerptParagraph).toBeNull()

    // Verify that the component still renders correctly without excerpt
    expect(tree).toBeTruthy()
  })

  it('verifies excerpt is rendered when explicitly provided', () => {
    const propsWithExcerpt = {
      ...baseProps,
      excerpt: 'This is a test excerpt that should be displayed.'
    }

    const component = renderer.create(<PostCard {...propsWithExcerpt} />)
    const tree = component.toJSON()

    // Verify that excerpt paragraph is rendered
    const excerptParagraph = findExcerptParagraph(tree)
    expect(excerptParagraph).toBeTruthy()
    expect(excerptParagraph.children).toContain('This is a test excerpt that should be displayed.')
  })
})

// Helper function to find the excerpt paragraph in the rendered tree
function findExcerptParagraph(tree) {
  if (!tree || !tree.children) return null

  for (const child of tree.children) {
    if (child.type === 'p' && child.props && child.props.className && child.props.className.includes('description')) {
      return child
    }
    if (child.children) {
      const found = findExcerptParagraph(child)
      if (found) return found
    }
  }
  return null
}
