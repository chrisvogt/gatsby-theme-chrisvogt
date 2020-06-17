import axios from 'axios'

const getProfiles = response => {
  const [profilesResponse, metaResponse] = response
  const { data: { result: { profiles = [] } = {} } = {} } = profilesResponse
  const { data: { result: { metas = [] } = {} } = {} } = metaResponse

  if (!metas.length) {
    return profiles.filter(Boolean)
  }

  const order = metas.find(meta => meta.key === 'socialProfilesOrder').order
  const sortedProfiles = order
    .map((meta, index) => profiles[index])
    .filter(Boolean)

  return sortedProfiles
}

export default async () => {
  try {
    const profilePromises = await Promise.all([
      axios('https://api.chrisvogt.me/profiles'),
      axios('https://api.chrisvogt.me/metas')
    ])

    const profiles = getProfiles(profilePromises)
    return profiles
  } catch (error) {
    return {
      error
    }
  }
}
