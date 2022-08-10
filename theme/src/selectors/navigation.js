export const getHeaderLeftItems = navigation => {
  const { header: { left: items = [] } = {} } = navigation
  return items
}
