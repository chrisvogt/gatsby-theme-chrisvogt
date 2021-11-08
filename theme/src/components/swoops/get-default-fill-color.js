const getDefaultFillColor = ({ colorMode, theme }) => colorMode === 'dark'
  ? theme.colors.modes.dark.background
  : theme.colors.background

export default getDefaultFillColor
