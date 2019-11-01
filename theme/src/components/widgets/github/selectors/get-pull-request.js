const getPullRequest = content => {
  const {
    user: { pullRequests: { nodes: pullRequests = [] } = {} } = {}
  } = content

  return pullRequests[0]
}

export default getPullRequest
