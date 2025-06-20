import widgets, {
  getGitHubWidget,
  getGoodreadsWidget,
  getInstagramWidget,
  getSpotifyWidget,
  getFlickrWidget,
  getSteamWidget,
  FETCH_DATASOURCE_SUCCESS,
  FETCH_DATASOURCE_FAILURE,
  SUCCESS,
  FAILURE,
  INIT
} from './widgets'

const initialState = {
  github: { state: INIT },
  goodreads: { state: INIT },
  instagram: { state: INIT },
  spotify: { state: INIT },
  flickr: { state: INIT },
  steam: { state: INIT }
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

    it('selects the Flickr widget from state', () => {
      const widget = getFlickrWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.flickr)
    })

    it('selects the Steam widget from state', () => {
      const widget = getSteamWidget({ widgets: initialState })
      expect(widget).toEqual(initialState.steam)
    })

    it('returns default state when widget is not in state', () => {
      const widget = getGitHubWidget({ widgets: {} })
      expect(widget).toEqual({ state: INIT })
    })

    it('returns default state when widgets is undefined', () => {
      const widget = getGitHubWidget({})
      expect(widget).toEqual({ state: INIT })
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

    it('handles FETCH_DATASOURCE_SUCCESS without data', () => {
      const action = {
        type: FETCH_DATASOURCE_SUCCESS,
        payload: {
          widgetId: 'github'
        }
      }
      const newState = widgets(initialState, action)
      expect(newState.github).toEqual({
        state: SUCCESS
      })
    })

    it('handles FETCH_DATASOURCE_FAILURE without error', () => {
      const action = {
        type: FETCH_DATASOURCE_FAILURE,
        payload: {
          widgetId: 'github'
        }
      }
      const newState = widgets(initialState, action)
      expect(newState.github).toEqual({
        state: FAILURE
      })
    })

    it('handles unknown action type', () => {
      const action = {
        type: 'UNKNOWN_ACTION',
        payload: {}
      }
      const newState = widgets(initialState, action)
      expect(newState).toEqual(initialState)
    })
  })
})
