import React from 'react'
import renderer from 'react-test-renderer'
import Spotify from './spotify'

// Mock fetch globally
global.fetch = jest.fn()

describe('Spotify', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders loading state initially', () => {
    const component = renderer.create(<Spotify spotifyURL='https://open.spotify.com/track/123' />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders error state when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    let component
    await renderer.act(async () => {
      component = renderer.create(<Spotify spotifyURL='https://open.spotify.com/track/123' />)
    })

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders error state when HTTP response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    let component
    await renderer.act(async () => {
      component = renderer.create(<Spotify spotifyURL='https://open.spotify.com/track/123' />)
    })

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders embed when fetch succeeds', async () => {
    const mockResponse = {
      html: '<iframe src="https://open.spotify.com/embed/track/123"></iframe>'
    }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    let component
    await renderer.act(async () => {
      component = renderer.create(<Spotify spotifyURL='https://open.spotify.com/track/123' />)
    })

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('does not render when no spotifyURL is provided', async () => {
    let component
    await renderer.act(async () => {
      component = renderer.create(<Spotify />)
    })

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(component.toJSON()).toBeNull()
  })
})
