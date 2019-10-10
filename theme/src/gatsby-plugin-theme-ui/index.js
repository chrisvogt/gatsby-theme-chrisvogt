import { tailwind } from '@theme-ui/presets'

const baseFonts = {
  serif: 'Domine'
}

const setThinFontWeight = {
  fontWeight: 300
}

export default {
  ...tailwind,
  fonts: {
    ...tailwind.fonts,
    ...setThinFontWeight,
    heading: baseFonts.serif
  },
  styles: {
    ...tailwind.styles,
    h2: {
      ...tailwind.styles.h2,
      ...setThinFontWeight
    },
    h3: {
      ...tailwind.styles.h3,
      ...setThinFontWeight
    },
    h4: {
      ...tailwind.styles.h4,
      ...setThinFontWeight
    }
  }
}
