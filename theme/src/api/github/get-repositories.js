import axios from 'axios'

export default async () => {
  try {
    const { data: { pinnedRepositories } = [] } = await axios(
      'https://metrics.chrisvogt.me/api/pinned-repositories'
    )
    return pinnedRepositories
  } catch (error) {
    return {
      error
    }
  }
}
