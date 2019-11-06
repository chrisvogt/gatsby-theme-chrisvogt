import { tailwind } from '@theme-ui/presets'

const trianglify = require('../components/artwork/trianglify.svg')

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
  borderRadius: `3px`,
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
  GitHub: {
    backgroundColor: `primary`
  },
  GitHubCardFooter: {
    alignItems: `flex-end`,
    display: `flex`,
    fontSize: `small`,
    justifyContent: `flex-end`,
    mt: 2
  },
  footer: {
    background: `url(${trianglify})`,
    color: `light`,
    a: {
      color: `white`
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
    maxWidth: [``, `94%`, ``, ``, `1200px`],
    py: [2, 3],
    px: [3, 4]
  },
  Footer: {
    color: `white`,
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
  },
  MetricCard: {
    ...card,
    borderLeftColor: `accent`,
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
  WidgetHeadline: {
    mb: 3,
    mt: 0,
    py: 3,
    textAlign: [`center`, `left`]
  },
  WidgetFooter: {
    color: `text`,
    fontFamily: `heading`,
    fontSize: 3,
    textAlign: [`center`, `right`]
  }
}
