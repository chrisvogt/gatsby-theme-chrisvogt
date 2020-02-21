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
  table: {
    width: `100%`,
    textAlign: `left`,
    th: {
      background: themePreset.colors.dark,
      color: themePreset.colors.light,
      padding: themePreset.space[3],
      textAlign: `left`
    },
    'tr th:first-of-type': {
      borderLeft: `0`,
      borderTopLeftRadius: `8px`
    },
    'tr th:last-of-type': {
      borderRight: `0`,
      borderTopRightRadius: `8px`
    },
    'tr td': {
      padding: themePreset.space[3]
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
    backgroundPosition: `top`,
    backgroundSize: `cover`,
    color: `white`,
    display: `block`,
    transition: `all 0.3s ease-in-out`,
    width: `100%`
  },
  PostCard: {
    ...floatOnHover,
    ...card,
    display: `flex`,
    flexDirection: `column`
  },
  RepositoryCard: {
    ...floatOnHover,
    ...card
  },
  MetricCard: {
    ...card,
    borderLeftColor: `textMuted`,
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
  TopNavigation: {
    color: `white`
  },
  TrackPreview: {
    img: {
      ...floatOnHover,
      borderRadius: `4px`,
      boxShadow: themePreset.shadows.md
    }
  },
  VideoWrapper: {
    background: `blue`,
    border: `3px solid red`,
    position: `relative`,
    paddingBottom: `56.25%` /* 16:9 */,
    paddingTop: `25px`,
    height: 0
  },
  'videoWrapper iframe': {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`
  },
  Widget: {
    backgroundColor: `background`,
    borderLeftWidth: [``, `3px`],
    borderLeftStyle: [`none`, `solid`],
    borderLeftColor: [``, `#9231A7`],
    borderRadius: [``, `3px`],
    borderTop: [``, `1px solid white`],
    boxShadow: [``, themePreset.shadows.default],
    mb: [3, 4],
    px: [0, 3, 4],
    py: [0, 3],
    '&:not(:last-of-type)': {
      borderBottom: [`2px solid #f9f9f9`, `1px solid white`]
    }
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
