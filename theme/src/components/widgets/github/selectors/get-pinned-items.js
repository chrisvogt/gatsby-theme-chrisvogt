const getPinnedItems = content => {
  const { user: { pinnedItems: { nodes = [] } = {} } = {} } = content

  return nodes
}

export default getPinnedItems
