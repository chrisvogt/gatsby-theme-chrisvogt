import { combineReducers } from 'redux'

import widgetsReducer from './widgets'

export default combineReducers({
  widgets: widgetsReducer
})
