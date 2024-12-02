import rootReducer from './index'
import widgetsReducer from './widgets'

jest.mock('./widgets', () => jest.fn((state = { defaultKey: 'defaultValue' }) => state))

describe('rootReducer', () => {
  it('returns the initial state when no action is passed', () => {
    const initialState = rootReducer(undefined, {})
    expect(initialState).toEqual({
      widgets: { defaultKey: 'defaultValue' }
    })
  })

  it('delegates actions to the widgetsReducer', () => {
    const action = { type: 'WIDGET_ACTION' }
    const widgetsState = { exampleKey: 'exampleValue' }

    // Mock the widgetsReducer's behavior for this test
    widgetsReducer.mockImplementation((state = widgetsState, action) => {
      return action.type === 'WIDGET_ACTION' ? { ...state, updated: true } : state
    })

    const state = rootReducer(undefined, action)
    expect(state.widgets).toEqual({ ...widgetsState, updated: true })
  })

  it('does not modify unrelated reducers', () => {
    const initialState = { widgets: { exampleKey: 'exampleValue' } }
    const action = { type: 'UNRELATED_ACTION' }
    const newState = rootReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
