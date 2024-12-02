/** @jsx jsx */
import renderer from 'react-test-renderer'
import { jsx } from 'theme-ui'
import TopTracks from './top-tracks'

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
    const tree = renderer.create(<TopTracks isLoading={false} tracks={mockTracks} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const tree = renderer.create(<TopTracks isLoading={true} />).toJSON()
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
    const tree = renderer.create(<TopTracks isLoading={false} tracks={incompleteTracks} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with no tracks', () => {
    const tree = renderer.create(<TopTracks isLoading={false} tracks={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
