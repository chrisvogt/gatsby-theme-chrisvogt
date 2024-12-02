import widgets, {
  getGitHubWidget,
  getGoodreadsWidget,
  getInstagramWidget,
  getSpotifyWidget,
  FETCH_DATASOURCE_SUCCESS,
  FETCH_DATASOURCE_FAILURE,
  INIT_WIDGET_CONFIG,
  SUCCESS,
  FAILURE,
  INIT
} from './widgets'

const initialState = {
  github: { state: INIT },
  goodreads: { state: INIT },
  instagram: { state: INIT },
  spotify: { state: INIT }
}

describe('Reducers/Widgets', () => {
  describe('widget selectors', () => {
    it('selects the GitHub widget from state', () => {
      const widget = getGitHubWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.github)
    })

    it('selects the Goodreads widget from state', () => {
      const widget = getGoodreadsWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.goodreads)
    })

    it('selects the Instagram widget from state', () => {
      const widget = getInstagramWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.instagram)
    })

    it('selects the Spotify widget from state', () => {
      const widget = getSpotifyWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.spotify)
    })
  })

  describe('widget reducer', () => {
    it('handles FETCH_DATASOURCE_SUCCESS', () => {
      const action = {
        type: FETCH_DATASOURCE_SUCCESS,
        payload: {
          data: { payload: 'test data' },
          widgetId: 'github'
        }
      }
      const newState = widgets(initialState, action)
      expect(newState.github).toEqual({
        state: SUCCESS,
        data: 'test data'
      })
    })

    it('handles FETCH_DATASOURCE_FAILURE', () => {
      const action = {
        type: FETCH_DATASOURCE_FAILURE,
        payload: {
          error: 'test error',
          widgetId: 'github'
        }
      }
      const newState = widgets(initialState, action)
      expect(newState.github).toEqual({
        state: FAILURE,
        error: 'test error'
      })
    })
  })
})
