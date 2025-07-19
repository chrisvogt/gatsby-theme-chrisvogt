import rootReducer from './index'

describe('Root Reducer', () => {
  it('combines reducers correctly', () => {
    const initialState = {
      audioPlayer: { isPlaying: false },
      widgets: {}
    }

    const action = { type: 'TEST_ACTION' }
    const state = rootReducer(initialState, action)

    expect(state).toHaveProperty('audioPlayer')
    expect(state).toHaveProperty('widgets')
  })

  it('includes audioPlayer and widgets reducers', () => {
    const state = rootReducer(undefined, { type: '@@INIT' })

    // Test that the structure includes both reducers
    expect(state).toHaveProperty('audioPlayer')
    expect(state).toHaveProperty('widgets')
  })
})
