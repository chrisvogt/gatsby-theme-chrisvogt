import axios from 'axios'

import getWidgetContent from './get-widget-content'
import githubFixture from '../../../__mocks__/github-widget.mock.json'

const mockAxiosResponse = {
  data: githubFixture
}

jest.mock('axios')

describe('getWidgetContent', () => {
  it('returns undefinedf on successful responses with no data', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(getWidgetContent()).resolves.toEqual(undefined)
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(getWidgetContent('github')).resolves.toEqual(githubFixture.payload)
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(getWidgetContent('invalid')).resolves.toEqual({ error: errorMessage })
  })
})
