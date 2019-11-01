const getPinnedRepositories = content => {
  const {
    user: { pinnedRepositories: { nodes: pinnedRepositories = [] } = {} } = {}
  } = content

  return pinnedRepositories
}

export default getPinnedRepositories
