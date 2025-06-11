import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  soundcloudId: null,
  isVisible: false
}

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setSoundcloudTrack: (state, action) => {
      state.soundcloudId = action.payload
      state.isVisible = true
    },
    hidePlayer: state => {
      state.isVisible = false
    },
    clearTrack: state => {
      state.soundcloudId = null
      state.isVisible = false
    }
  }
})

export const { setSoundcloudTrack, hidePlayer, clearTrack } = audioPlayerSlice.actions
export default audioPlayerSlice.reducer
