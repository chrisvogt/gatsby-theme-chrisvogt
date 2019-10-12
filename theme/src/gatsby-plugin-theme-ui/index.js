import { darken } from '@theme-ui/color'
import { tailwind } from '@theme-ui/presets'

const baseFonts = {
  serif: 'Domine'
}

const setThinFontWeight = {
  fontWeight: 300
}

const themePreset = tailwind

export default {
  ...tailwind,
  fonts: {
    ...themePreset.fonts,
    ...setThinFontWeight,
    heading: baseFonts.serif
  },
  styles: {
    ...themePreset.styles,

    root: {
      ...themePreset.styles.root,
      color: `text`,
      backgroundColor: `background`
    },
    h2: {
      ...themePreset.styles.h2,
      ...setThinFontWeight
    },
    h3: {
      ...themePreset.styles.h3,
      ...setThinFontWeight
    },
    h4: {
      ...themePreset.styles.h4,
      ...setThinFontWeight
    },
    text: {
      inverse: {
        color: themePreset.colors.muted
      }
    },
    GitHub: {
      backgroundColor: `primary`
    },
    footer: {
      backgroundColor: `primary`,
      color: `light`,
      a: {
        color: `lightover`
      }
    },
    Container: {
      ...themePreset.Container,
      maxWidth: `90%`
    },
    SubFooter: {
      backgroundColor: darken(`primary`, 0.15)
    },
    Footer: {
      width: `100%`,
      display: `block`,
      variant: `styles.footer`
    },
    Header: {
      alignItems: `center`,
      backgroundColor: `primary`,
      // backgroundImage: `url(/images/trianglify.svg)`,
      backgroundPosition: `top`,
      backgroundSize: `cover`,
      color: `white`,
      display: `block`,
      transition: `all 0.3s ease-in-out`,
      width: `100%`
    }
  }
}
