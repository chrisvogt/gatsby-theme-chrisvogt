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
  styles: {
    ...themePreset.styles,
    ...styles
  }
}
