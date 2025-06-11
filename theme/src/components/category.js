/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

// Special category mappings for custom formatting
const categoryMappings = {
  'photography/travel': 'Travel Photography',
  'photography/events': 'Event Photography',
  'music/piano-covers': 'Piano Covers',
  'videos/bike-rides': 'Cycling Videos'
}

// Helper function to convert string to title case
const toTitleCase = str => {
  return str
    .split(/[-/]/) // Split by hyphen or forward slash
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const Category = ({ sx = {}, type }) => {
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'

  // Use mapping if exists, otherwise convert to title case
  const category = categoryMappings[type] || toTitleCase(type)

  return (
    <Themed.div
      sx={{
        fontSize: [1],
        fontFamily: 'heading',
        display: 'inline-block',
        width: 'fit-content',
        padding: '4px 12px',
        borderRadius: '20px',
        position: 'relative',
        background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
        boxShadow: isDark
          ? '0 2px 4px rgba(0, 0, 0, 0.2)'
          : `
            0 4px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          right: '-1px',
          bottom: '-1px',
          borderRadius: '20px',
          background: isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
          zIndex: -1,
          opacity: isDark ? 0.3 : 0.5
        },
        ...sx
      }}
    >
      {category}
    </Themed.div>
  )
}

export default Category
