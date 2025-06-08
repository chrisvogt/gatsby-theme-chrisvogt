import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import SoundCloud from './soundcloud'

// Mock theme object
const mockTheme = {
  colors: {
    background: '#fdf8f5',
    modes: {
      dark: {
        background: '#1e1e2f'
      }
    }
  }
}

// Helper function to render with theme
const renderWithTheme = (ui, colorMode = 'default') => {
  return renderer.create(<ThemeUIProvider theme={{ ...mockTheme, initialColorMode: colorMode }}>{ui}</ThemeUIProvider>)
}

// Mock the useColorMode hook
jest.mock('theme-ui', () => {
  const original = jest.requireActual('theme-ui')
  return {
    ...original,
    useColorMode: jest.fn().mockReturnValue(['default', () => {}])
  }
})

describe('SoundCloud Shortcode', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('matches the snapshot in light mode', () => {
    const tree = renderWithTheme(<SoundCloud soundcloudId='880888540' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches the snapshot in dark mode', () => {
    require('theme-ui').useColorMode.mockReturnValue(['dark', () => {}])
    const tree = renderWithTheme(<SoundCloud soundcloudId='880888540' />, 'dark').toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a default title if one is not provided', () => {
    const testRenderer = renderWithTheme(<SoundCloud soundcloudId='880888540' />)
    const testInstance = testRenderer.root
    expect(testInstance.findByType('iframe').props.title).toEqual('Song on SoundCloud')
  })

  it('includes the correct accent color in light mode', () => {
    require('theme-ui').useColorMode.mockReturnValue(['default', () => {}])
    const testRenderer = renderWithTheme(<SoundCloud soundcloudId='880888540' />)
    const testInstance = testRenderer.root
    const iframeSrc = testInstance.findByType('iframe').props.src
    expect(iframeSrc).toContain('color=%23ff5500') // orange for light mode
  })

  it('includes the correct accent color in dark mode', () => {
    require('theme-ui').useColorMode.mockReturnValue(['dark', () => {}])
    const testRenderer = renderWithTheme(<SoundCloud soundcloudId='880888540' />, 'dark')
    const testInstance = testRenderer.root
    const iframeSrc = testInstance.findByType('iframe').props.src
    expect(iframeSrc).toContain('color=%23800080') // purple for dark mode
  })

  it('includes the correct track ID in the URL', () => {
    const testRenderer = renderWithTheme(<SoundCloud soundcloudId='880888540' />)
    const testInstance = testRenderer.root
    const iframeSrc = testInstance.findByType('iframe').props.src
    expect(iframeSrc).toContain('tracks/880888540')
  })
})
