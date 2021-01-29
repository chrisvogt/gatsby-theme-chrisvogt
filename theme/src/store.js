import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

// const initialState = {
//   config: {},
//   dataSources: {},
//   widgets: {
//     dataSources: {}
//   }
// }

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducers, composeEnhancer)

export default store
