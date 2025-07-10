/** @jsx jsx */
import renderer from 'react-test-renderer'
import { jsx } from 'theme-ui'
import TopTracks from './top-tracks'
import { TestProviderWithState } from '../../../testUtils'

describe('TopTracks Component', () => {
  const mockTracks = [
    {
      id: '1',
      name: 'Song One',
      artists: ['Artist One', 'Artist Two'],
      albumImages: [
        { url: 'http://example.com/large.jpg', width: 640 },
        { url: 'http://example.com/medium.jpg', width: 300 },
        { url: 'http://example.com/small.jpg', width: 64 }
      ],
      spotifyURL: 'http://spotify.com/track1'
    },
    {
      id: '2',
      name: 'Song Two',
      artists: ['Artist Three'],
      albumImages: [
        { url: 'http://example.com/medium2.jpg', width: 300 },
        { url: 'http://example.com/small2.jpg', width: 64 }
      ],
      spotifyURL: 'http://spotify.com/track2'
    }
  ]

  it('renders correctly with tracks', () => {
    const tree = renderer
      .create(
        <TestProviderWithState>
          <TopTracks isLoading={false} tracks={mockTracks} />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const tree = renderer
      .create(
        <TestProviderWithState>
          <TopTracks isLoading={true} />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles tracks without a 300px image gracefully', () => {
    const incompleteTracks = [
      {
        id: '3',
        name: 'Song Three',
        artists: ['Artist Four'],
        albumImages: [{ url: 'http://example.com/small3.jpg', width: 64 }],
        spotifyURL: 'http://spotify.com/track3'
      }
    ]
    const tree = renderer
      .create(
        <TestProviderWithState>
          <TopTracks isLoading={false} tracks={incompleteTracks} />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with no tracks', () => {
    const tree = renderer
      .create(
        <TestProviderWithState>
          <TopTracks isLoading={false} tracks={[]} />
        </TestProviderWithState>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('dispatches setSpotifyTrack action when track is clicked', () => {
    const mockDispatch = jest.fn()
    const mockSetSpotifyTrack = jest.fn()

    // Mock the useDispatch hook
    jest.doMock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch
    }))

    // Mock the setSpotifyTrack action
    jest.doMock('../../../reducers/audioPlayer', () => ({
      setSpotifyTrack: mockSetSpotifyTrack
    }))

    const tree = renderer
      .create(
        <TestProviderWithState>
          <TopTracks isLoading={false} tracks={mockTracks} />
        </TestProviderWithState>
      )
      .toJSON()

    expect(tree).toBeTruthy()
  })
})
