import React from 'react'
import renderer, { act } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AudioPlayer from '../components/audio-player'

// Mock SoundCloud to avoid iframe logic
jest.mock('../shortcodes/soundcloud', () => jest.fn(() => <div>MockSoundCloud</div>))

const mockStore = configureStore([])

describe('AudioPlayer', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
    store.dispatch = jest.fn()
    document.body.innerHTML = ''
  })

  it('renders and cleans up the portal container', async () => {
    let component
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <AudioPlayer soundcloudId='abc' isVisible={true} />
        </Provider>
      )
    })

    expect(document.getElementById('audio-player-portal')).toBeTruthy()

    await act(async () => {
      component.unmount()
    })

    expect(document.getElementById('audio-player-portal')).toBeNull()
  })

  it('matches snapshot when visible', async () => {
    // Only mock createPortal for this test
    const createPortalMock = jest.spyOn(require('react-dom'), 'createPortal').mockImplementation(node => node)

    let component
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <AudioPlayer soundcloudId='abc' isVisible={true} />
        </Provider>
      )
    })

    expect(component.toJSON()).toMatchSnapshot()

    createPortalMock.mockRestore()
  })
})
