import colors from './abstracts/colors'
import fonts from './abstracts/fonts'
import styles, { themePreset } from './styles'

export default {
  ...themePreset,
  colors: {
    ...themePreset.colors,
    ...colors
  },
  fonts: {
    body: fonts.sans,
    heading: fonts.serif,
    monospace: fonts.mono
  },
  fontSizes: [
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '1.875rem',
    '2.25rem',
    '3rem',
    '4rem',
    '4.5rem'
  ],
  layout: {
    container: {
      maxWidth: [``, `94%`, ``, ``, `1200px`],
      py: [2, 3],
      px: [3, 4]
    }
  },
  styles: {
    ...themePreset.styles,
    ...styles
  }
}
