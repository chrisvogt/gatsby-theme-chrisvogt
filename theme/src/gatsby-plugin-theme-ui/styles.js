import { tailwind } from '@theme-ui/presets'

export const themePreset = tailwind

export const floatOnHover = {
  transition: `all 200ms ease-in-out`,

  '&:hover, &:focus': {
    transform: `scale(1.015)`,
    boxShadow: `lg`
  }
}

export const card = {
  backgroundColor: `white`,
  borderBottom: `1px solid white`,
  borderRadius: `3px`,
  boxShadow: `default`,
  color: `text`,
  flexGrow: 1,
  padding: 3,
  textDecoration: `none`
}

export const infoCard = {
  boxShadow: `none`,
  borderBottom: `1px solid #efefef`,
  borderLeftColor: `text`,
  borderLeft: `2px solid`,
  span: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    padding: 2
  }
}

export const PostCard = {
  ...card,
  ...floatOnHover,
  display: `flex`,
  height: `100%`,
  flexDirection: `column`,
  '.card-media': {
    mb: 2,
    height: `100%`,
    overflow: `hidden`
  },
  '.read-more-icon': {
    display: `inline`,
    transition: `all 250ms ease-in`,
    opacity: 0,
    paddingLeft: 0
  },
  '&:hover .read-more-icon': {
    opacity: 1,
    paddingLeft: `8px`
  }
}

export default {
  root: {
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
      color: `muted`
    }
  },
  GitHubCardFooter: {
    alignItems: `flex-end`,
    display: `flex`,
    fontSize: `small`,
    justifyContent: `flex-end`,
    mt: 2
  },
  PageFooter: {
    backgroundColor: `#1e2530`,
    color: `light`,
    a: {
      color: `white`
    },
    width: `100%`,
    display: `block`
  },
  Book: {
    filter: `drop-shadow(${themePreset.shadows.default})`,
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
  GradientBanner: {
    /**
     * Gradient animation created by @bibby0912.
     * Visit https://codepen.io/bibby0912/pen/mErWyA
     */
    mx: [3, `auto`],
    maxWidth: [`100%`, `100%`, `80%`],
    height: `40vh`,
    border: `20px solid transparent`,
    boxSizing: `border-box`,
    padding: `1rem`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    color: `black`,
    backgroundImage: `
      linear-gradient(white 5%, white 10%),
      linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);`,
    backgroundRepeat: `no-repeat`,
    backgroundOrigin: `padding-box, border-box`,
    textAlign: `center`,
    '@keyframes GradientBanner': {
      '100%': {
        backgroundPosition: `0 0, 0 0`
      }
    }
  },
  IntroExperienceSlide: {
    opacity: 0,
    height: 0,
    display: `flex`,
    '&.active-slide': {
      display: `block`,
      height: `auto`,
      opacity: 1
    }
  },
  Header: {
    alignItems: `center`,
    backgroundColor: `secondary`,
    color: `white`,
    display: `block`,
    transition: `all 0.3s ease-in-out`,
    width: `100%`
  },
  InstagramCard: {
    ...floatOnHover,
    boxShadow: `md`,
    overflow: `hidden`,
    '&:hover .instagram-item-image': {
      transform: `scale(1.05)`
    }
  },
  PostCardLink: {
    textDecoration: `none`
  },
  TopNavigation: {
    color: `white`
  },
  TrackPreview: {
    img: {
      ...floatOnHover,
      borderRadius: `4px`,
      boxShadow: `md`
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
    mb: [3, 4],
    py: [0, 3, 4]
  },
  WidgetHeadline: {
    textAlign: [`center`, `left`],
    display: `flex`,
    flexDirection: [`column`, `row`],
    alignItems: [``, `center`],
    mb: 3,
    mt: 0,
    py: 3
  },
  WidgetHeadline__Aside: {
    ml: [0, 2]
  },
  WidgetFooter: {
    color: `text`,
    fontFamily: `heading`,
    fontSize: 3,
    textAlign: [`center`, `right`]
  },

  table: {
    width: `100%`,
    textAlign: `left`,
    th: {
      borderBottom: `1px dotted #ddd`,
      borderLeft: `1px dotted #ddd`,
      borderTop: `1px solid #ddd`,
      color: `text`,
      padding: theme => theme.space[2],
      textAlign: `left`
    },
    'tr th:first-of-type': {
      borderLeft: `1px solid #ddd`,
      borderTopLeftRadius: `4px`
    },
    'tr th:last-of-type': {
      borderRight: `1px solid #ddd`,
      borderTopRightRadius: `4px`
    },
    'tr td': {
      borderBottom: `1px dotted #ddd`,
      padding: theme => theme.space[2]
    },
    'tr:last-of-type td': {
      borderBottom: `1px solid #ddd`
    },
    'tbody tr td:first-of-type': {
      borderLeft: `1px solid #ddd`
    },
    'tbody tr td:last-of-type': {
      borderRight: `1px solid #ddd`
    }
  },

  '.footnotes': {
    fontSize: theme => theme.fontSizes[1]
  },

  '.text-center': {
    textAlign: `center`
  },

  '.VideoWrapper': {
    position: `relative`,
    paddingBottom: `56.25%` /* 16:9 */,
    paddingTop: `25px`,
    height: 0
  },

  '.VideoWrapper iframe': {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`
  },

  '.gatsby-highlight pre[class*="language-"]': {
    padding: 0,
    overflow: `initial`,
    float: `left`,
    minWidth: `100%`
  },

  /* Adjust the position of the line numbers */
  '.gatsby-highlight pre[class*="language-"].line-numbers': {
    paddingLeft: `2.8em`
  }
}
