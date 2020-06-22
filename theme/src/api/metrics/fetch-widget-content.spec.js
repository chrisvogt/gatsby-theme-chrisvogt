import axios from 'axios'

import fetchWidgetContent from './fetch-widget-content'
import githubFixture from '../../../__mocks__/github-widget.mock.json'

const mockAxiosResponse = {
  data: githubFixture
}

jest.mock('axios')

describe('fetchWidgetContent', () => {
  it('returns undefinedf on successful responses with no data', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(fetchWidgetContent()).resolves.toEqual(undefined)
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(fetchWidgetContent('github')).resolves.toEqual(githubFixture.payload)
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(fetchWidgetContent('invalid')).resolves.toEqual({ error: errorMessage })
  })
})
