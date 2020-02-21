import colors from './colors'
import styles, { themePreset } from './styles'

export default {
  ...themePreset,
  initialColorModeName: 'PrivateSphere',
  colors: {
    ...themePreset.colors,
    ...colors
  },
  fonts: {
    ...themePreset.fonts,
    heading: 'Domine, serif'
  },
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
