import { tailwind } from '@theme-ui/presets'
import vsDark from '@theme-ui/prism/presets/vs-dark.json'

import colors from './colors'

const trianglify = require('../components/artwork/trianglify.svg')

const prismPreset = vsDark
export const themePreset = tailwind

const floatOnHover = {
  '&:hover, &:focus': {
    transform: `scale(1.01)`,
    transition: `all .35s ease-in-out`,
    boxShadow: `xl`
  }
}

const card = {
  backgroundColor: `white`,
  borderBottom: `1px solid white`,
  borderLeft: `3px solid`,
  borderLeftColor: `primary`,
  borderRadius: `2px`,
  borderTop: `1px solid white`,
  boxShadow: themePreset.shadows.md,
  color: `text`,
  flexGrow: 1,
  padding: 3,
  textDecoration: `none`
}

export default {
  root: {
    ...themePreset.styles.root,
    backgroundColor: `background`,
    color: `text`,
    display: `flex`,
    flexDirection: `column`,
    minHeight: `100vh`
  },
  outlined: {
    border: `4px solid #efefef`
  },
  text: {
    inverse: {
      color: themePreset.colors.muted
    }
  },
  pre: {
    ...prismPreset,
    padding: themePreset.space[3]
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
    ...card
  },
  RepositoryCard: {
    ...floatOnHover,
    ...card
    // backgroundColor: darken(`primary`, 0.04),
    // // border: `2px solid white`,
    // // borderRadius: `2px`,
    // color: `white`,
    // marginBottom: [3, `inherit`],
    // padding: 3,
    // // width: `100%`,
    // '&:hover, &:focus': {
    //   ...floatOnHover,
    //   // backgroundColor: lighten(`primary`, 0.04),
    //   textDecoration: `none`,
    // }
  },
  MetricCard: {
    ...card,
    borderLeftColor: `info`,
    span: {
      fontFamily: `heading`,
      fontWeight: `bold`,
      padding: 2
    }
  },
  InstagramCard: {
    ...floatOnHover,
    boxShadow: themePreset.shadows.md
  },
  Widget: {
    backgroundColor: `#f8f8f8`,
    borderBottom: `1px solid white`,
    borderLeft: `3px solid ${colors.secondary}`,
    borderRadius: `2px`,
    borderTop: `1px solid white`,
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
