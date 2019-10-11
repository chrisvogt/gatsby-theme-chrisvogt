import axios from 'axios'

// NOTE(cvogt): the current sorting below is fragile and will not scale.
// Consider whether this really needs to support non-determanistic order.
const getProfiles = response => {
  const [profilesResponse, metaResponse] = response
  const { data: { result: { profiles = [] } = {} } = {} } = profilesResponse
  const { data: { result: { metas = [] } = {} } = {} } = metaResponse
  const order = metas.find(meta => meta.key === 'socialProfilesOrder').order
  const sortedMetas = order.map((meta, index) => profiles[index])

  return sortedMetas
}

export default async () => {
  try {
    const profilePromises = await Promise.all([
      axios('https://api.chrisvogt.me/profiles'),
      axios('https://api.chrisvogt.me/metas')
    ])

    const profiles = getProfiles(profilePromises)
    return profiles
  } catch (err) {
    return {
      err
    }
  }
}
