const getPinnedItems = payload => {
  const { user: { pinnedItems: { nodes = [] } = {} } = {} } = payload
  return nodes
}

export default getPinnedItems
