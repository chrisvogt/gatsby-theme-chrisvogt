import { darken } from '@theme-ui/color'
import { tailwind } from '@theme-ui/presets'

import colors from './colors'
import trianglify from '../components/artwork/trianglify.svg'

const baseFonts = {
  serif: 'Domine'
}

const setThinFontWeight = {
  fontWeight: 300
}

const themePreset = tailwind

export default {
  ...tailwind,
  colors: {
    ...tailwind,
    ...colors
  },
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
    outlined: {
      border: `4px solid #efefef`
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
      backgroundColor: `secondary`,
      color: `white`,
      a: {
        color: `lightover`
      }
    },
    Container: {
      ...themePreset.Container,
      maxWidth: [`94%`, ``, ``, ``, `1200px`]
    },
    SubFooter: {
      backgroundColor: darken(`secondary`, 0.08)
    },
    Footer: {
      width: `100%`,
      display: `block`,
      variant: `styles.footer`
    },
    Header: {
      alignItems: `center`,
      backgroundColor: `secondary`,
      background: `url(${trianglify})`,
      backgroundPosition: `top`,
      backgroundSize: `cover`,
      color: `white`,
      display: `block`,
      transition: `all 0.3s ease-in-out`,
      width: `100%`
    },
    PostCard: {
      borderBottom: `1px solid #ededed`,
      borderTop: `1px solid #ededed`,
      backgroundColor: `white`,
      borderRadius: `2px`,
      borderLeft: `3px solid`,
      borderLeftColor: `primary`,
      padding: 3
    },
    Widget: {
      borderBottom: `1px solid #ededed`,
      borderTop: `1px solid #ededed`,
      backgroundColor: `#f8f8f8`,
      borderRadius: `2px`,
      borderLeft: `3px solid ${colors.accent}`
    },
    WidgetHeadline: {
      mb: 3,
      mt: 0,
      py: 2,
      textAlign: [`center`, `left`]
    },
    WidgetFooter: {
      color: `text`,
      fontFamily: `heading`,
      fontSize: 3,
      textAlign: [`center`, `right`]
    }
  }
}
