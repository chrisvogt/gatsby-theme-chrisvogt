import { tailwind } from '@theme-ui/presets'

import colors from './colors'

const trianglify = require('../components/artwork/trianglify.svg')

const baseFonts = {
  serif: 'Domine'
}

const floatOnHover = {
  '&:hover, &:focus': {
    transform: `scale(1.01)`,
    transition: `all .35s ease-in-out`,
    boxShadow: `xl`
  }
}

const setThinFontWeight = {
  fontWeight: 300
}

export const themePreset = tailwind

export default {
  ...tailwind,
  colors: {
    ...tailwind.colors,
    ...colors
  },
  fonts: {
    ...themePreset.fonts,
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
      backgroundColor: themePreset.colors.light,
      color: `white`,
      a: {
        color: `lightover`
      }
    },
    Book: {
      '&:hover, &:focus': {
        filter: `drop-shadow(${themePreset.shadows.xl})`,
        transform: `scale(1.01)`,
        transition: `all .35s ease-in-out`
      }
    },
    Container: {
      ...themePreset.Container,
      maxWidth: [`94%`, ``, ``, ``, `1200px`]
    },
    SubFooter: {
      background: `url(${trianglify})`
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
      ...floatOnHover,
      borderBottom: `1px solid #ededed`,
      borderTop: `1px solid #ededed`,
      backgroundColor: `white`,
      borderRadius: `2px`,
      borderLeft: `3px solid`,
      borderLeftColor: `primary`,
      boxShadow: themePreset.shadows.md,
      padding: 3
    },
    InstagramCard: {
      ...floatOnHover,
      boxShadow: themePreset.shadows.md
    },
    Widget: {
      backgroundColor: `#f8f8f8`,
      borderBottom: `1px solid #ededed`,
      borderLeft: `3px solid ${colors.secondary}`,
      borderRadius: `2px`,
      borderTop: `1px solid #ededed`,
      boxShadow: themePreset.shadows.default
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
