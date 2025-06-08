import reducer, { setSoundcloudTrack, hidePlayer, clearTrack } from '../reducers/audioPlayer'

describe('audioPlayer reducer', () => {
  const initialState = {
    soundcloudId: null,
    isVisible: false
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle setSoundcloudTrack', () => {
    const action = setSoundcloudTrack('abc123')
    const result = reducer(initialState, action)

    expect(result).toEqual({
      soundcloudId: 'abc123',
      isVisible: true
    })
  })

  it('should handle hidePlayer', () => {
    const prevState = {
      soundcloudId: 'abc123',
      isVisible: true
    }
    const result = reducer(prevState, hidePlayer())

    expect(result).toEqual({
      soundcloudId: 'abc123',
      isVisible: false
    })
  })

  it('should handle clearTrack', () => {
    const prevState = {
      soundcloudId: 'abc123',
      isVisible: true
    }
    const result = reducer(prevState, clearTrack())

    expect(result).toEqual({
      soundcloudId: null,
      isVisible: false
    })
  })
})
