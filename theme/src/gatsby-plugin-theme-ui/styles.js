import { tailwind } from '@theme-ui/presets'
import { floatOnHover } from './abstracts/shadows'

export const themePreset = tailwind

const GradientBanner = {
  /**
   * Gradient animation created by @bibby0912.
   * Visit https://codepen.io/bibby0912/pen/mErWyA
   */
  maxWidth: `100%`,
  height: `340px`,
  border: `20px solid transparent`,
  boxSizing: `border-box`,
  padding: `1rem`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  color: `black`,

  // backgroundImage: `
  //   linear-gradient(white, white),
  //   linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);`,
  // backgroundRepeat: `no-repeat`,
  // backgroundOrigin: `padding-box, border-box`,
  // backgroundPosition: `0 0, 0 100%`,
  // backgroundSize: `100% 100%, 100% 200%`,
  // animation: `highlight 3s infinite alternate`,
  // textAlign: `center`,

  backgroundImage: `
  linear-gradient(white, white),
  linear-gradient(180deg, cornflowerblue, purple 50%, cornflowerblue)`,

  backgroundRepeat: `no-repeat`,
  backgroundSize: `100% 100%, 100% 200%`,
  backgroundPosition: `0 0, 0 100%`,
  backgroundOrigin: `padding-box, border-box`,
  animation: `highlight 3s infinite alternate`,

  '@keyframes highlight': {
    '100%': {
      backgroundPosition: `0 0, 0 0`
    }
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
    display: `flex`,
    fontSize: `small`,
    justifyContent: `space-between`,
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
    filter: theme => `drop-shadow(${theme.shadows.default})`,
    '&:hover, &:focus': {
      filter: theme => `drop-shadow(${theme.shadows.xl})`,
      transform: `scale(1.01)`,
      transition: `all .35s ease-in-out`
    }
  },

  Container: {
    py: [2, 3],
    px: [3, 4]
  },

  GradientBanner,

  GradientBannerDark: {
    ...GradientBanner,
    backgroundImage: `
    linear-gradient(#252e3c, #252e3c),
    linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);`,
    color: `light`
  },

  IntroExperienceSlide: {
    opacity: 0,
    height: 0,
    display: `flex`,
    visibility: `hidden`,
    '&.active-slide': {
      display: `block`,
      height: `auto`,
      opacity: 1,
      visibility: `initial`
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
    boxShadow: `md`
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
    position: `relative`,
    paddingBottom: `56.25%` /* 16:9 */,
    paddingTop: `25px`,
    height: 0,
    iframe: {
      position: `absolute`,
      top: 0,
      left: 0,
      width: `100%`,
      height: `100%`
    }
  },

  Widget: {
    mb: [3, 4],
    py: [0, 3, 4]
  },

  WidgetHeadline: {
    textAlign: [`center`, `left`],
    display: `flex`,
    flexDirection: [`column`, `row`],
    alignItems: [``, `center`]
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
