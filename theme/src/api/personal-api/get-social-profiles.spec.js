import axios from 'axios'

import getSocialProfiles from './get-social-profiles'

import metasFixture from '../../../__mocks__/metas.mock.json'
import socialProfilesFixture from '../../../__mocks__/profiles.mock.json'

const mockProfilesAxiosResponse = {
  data: socialProfilesFixture
}

const mockMetasAxiosresponse = {
  data: metasFixture
}

jest.mock('axios')

describe('getRecentBooks', () => {
  it('defaults to an empty array on successful response with no data', async () => {
    axios
      .mockImplementationOnce(() => Promise.resolve({}))
      .mockImplementationOnce(() => Promise.resolve({}))
      
    await expect(getSocialProfiles()).resolves.toEqual([])
  })

  it('returns unsorted profiles if the metadata is not found', async () => {
    axios
      .mockImplementationOnce(() => Promise.resolve(mockProfilesAxiosResponse))
      .mockImplementationOnce(() => Promise.resolve({}))
      
    await expect(getSocialProfiles()).resolves.toEqual(socialProfilesFixture.result.profiles)
  })

  it('it fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios
      .mockImplementationOnce(() => Promise.resolve(mockProfilesAxiosResponse))
      .mockImplementationOnce(() => Promise.resolve(mockMetasAxiosresponse))
      
    await expect(getSocialProfiles()).resolves.toEqual(socialProfilesFixture.result.profiles)
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios
      .mockImplementationOnce(() => Promise.reject(errorMessage))
      .mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(getSocialProfiles()).resolves.toEqual({ error: errorMessage })
  })
})
