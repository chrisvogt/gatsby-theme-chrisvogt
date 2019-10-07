import axios from "axios"

export default async options => {
  try {
    const { data: { pinnedRepositories } = [] } = await axios(
      "https://metrics.chrisvogt.me/api/pinned-repositories"
    )
    return pinnedRepositories
  } catch (err) {
    return {
      err
    }
  }
}
