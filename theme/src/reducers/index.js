import { combineReducers } from 'redux'

import audioPlayerReducer from './audioPlayer'
import widgetsReducer from './widgets'

export default combineReducers({
  audioPlayer: audioPlayerReducer,
  widgets: widgetsReducer
})
