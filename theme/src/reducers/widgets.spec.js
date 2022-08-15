import { getGitHubWidget, getGoodreadsWidget, getInstagramWidget, getSpotifyWidget, INIT } from './widgets'

const mockState = {
  widgets: {
    github: {
      state: INIT
    },
    goodreads: {
      state: INIT
    },
    instagram: {
      state: INIT
    },
    spotify: {
      state: INIT
    }
  }
}

describe('Reducers/Widgets', () => {
  describe('widget selectors', () => {
    it('selects the GitHub widget from state', () => {
      const widget = getGitHubWidget(mockState)
      expect(widget).toEqual(mockState.widgets.github)
    })

    it('selects the Goodreads widget from state', () => {
      const widget = getGoodreadsWidget(mockState)
      expect(widget).toEqual(mockState.widgets.goodreads)
    })

    it('selects the Instagram widget from state', () => {
      const widget = getInstagramWidget(mockState)
      expect(widget).toEqual(mockState.widgets.instagram)
    })

    it('selects the Spotify widget from state', () => {
      const widget = getSpotifyWidget(mockState)
      expect(widget).toEqual(mockState.widgets.spotify)
    })
  })
})
