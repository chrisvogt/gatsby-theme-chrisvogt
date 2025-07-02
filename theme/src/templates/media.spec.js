import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import { useStaticQuery } from 'gatsby'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Media, { Head } from './media'

// Mocked Data
const data = {
  mdx: {
    id: 'mock-media-id',
    fields: {
      category: 'Mock Category',
      path: '/music/mock-media'
    },
    frontmatter: {
      title: 'A Mock Blog Post',
      date: 'Mon, 17 Jun 2024 03:30:26 GMT',
      soundcloudId: null,
      youtubeSrc: null,
      banner: 'mock-banner.jpg',
      description: 'Mock Description',
      keywords: ['mock', 'test', 'music']
    }
  }
}

// Mock theme object
const mockTheme = {
  colors: {
    'panel-background': '#f0f0f0'
  }
}

// Create mock store
const mockStore = configureStore([])
const store = mockStore({
  audioPlayer: {
    isVisible: false,
    soundcloudId: null
  }
})

jest.mock('gatsby')
jest.mock('../components/layout', () => {
  return ({ children }) => <div className='layoutMock'>{children}</div>
})

jest.mock('../components/seo', () => {
  return ({ children }) => <div className='seoMock'>{children}</div>
})

jest.mock('../shortcodes/soundcloud', () => {
  return ({ soundcloudId }) => <div className='soundcloudMock'>{soundcloudId}</div>
})

jest.mock('../shortcodes/youtube', () => {
  return ({ url }) => <div className='youtubeMock'>{url}</div>
})

const MediaPostContent = <div>Lorum ipsum dolor sit amet.</div>

describe('Media Post', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // Helper function to wrap components in the ThemeUIProvider and Redux Provider
  const renderWithTheme = component =>
    renderer.create(
      <Provider store={store}>
        <ThemeUIProvider theme={mockTheme}>{component}</ThemeUIProvider>
      </Provider>
    )

  // Test with no media sources
  it('renders correctly with no media sources', () => {
    const tree = renderWithTheme(<Media data={data} children={MediaPostContent} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // Test with YouTube source
  it('renders correctly with a YouTube source', () => {
    const youtubeData = {
      ...data,
      mdx: {
        ...data.mdx,
        frontmatter: { ...data.mdx.frontmatter, youtubeSrc: 'mockYoutubeSrc' }
      }
    }
    const tree = renderWithTheme(<Media data={youtubeData} children={MediaPostContent} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // Test with SoundCloud source
  it('renders correctly with a SoundCloud source', () => {
    const soundcloudData = {
      ...data,
      mdx: {
        ...data.mdx,
        frontmatter: { ...data.mdx.frontmatter, soundcloudId: 'mockSoundCloudId' }
      }
    }
    const tree = renderWithTheme(<Media data={soundcloudData} children={MediaPostContent} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // Test the SEO Head component
  it('renders the Head component with SEO data', () => {
    const seoTree = renderWithTheme(<Head data={data} />).toJSON()
    expect(seoTree).toMatchSnapshot()
  })
})
