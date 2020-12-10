import colors from './abstracts/colors'
import fonts from './abstracts/fonts'

import { card, infoCard, PostCard } from './components/card'

import { floatOnHover } from './abstracts/shadows'

import styles, { themePreset } from './styles'

import { merge } from 'theme-ui'

export default merge(themePreset, {
  useColorSchemeMediaQuery: true,

  badges: {
    primary: {
      color: 'background',
      bg: 'primary'
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    }
  },

  cards: {
    /* The <Card /> default style. Used when no variant is defined. */
    primary: {
      ...card
    },

    actionCard: {
      ...card,
      ...floatOnHover,
      borderLeft: theme => `3px solid ${theme.colors.primary}`
    },

    actionCardDark: {
      ...card,
      ...floatOnHover,
      backgroundColor: `#252e3c`,
      borderBottom: `none`,
      borderLeft: theme => `3px solid ${theme.colors.primary}`,
      color: `white`
    },

    infoCard: {
      ...card,
      ...infoCard
    },

    infoCardDark: {
      ...card,
      ...infoCard,
      backgroundColor: `#252e3c`,
      borderLeft: `3px solid #fefefe`,
      borderBottom: `none`,
      color: `white`,
      a: {
        color: theme => theme.colors.primary
      }
    },

    /* The following styles represent specific card components, indicated in PascalCase. */

    UserProfile: {
      padding: theme => [`none`, `0 ${theme.space[3]} 0 0`],
      border: `none`,
      color: `white`,
      background: `none`
    },

    UserProfileDark: {
      ...card,
      padding: theme => [`none`, `0 ${theme.space[3]} 0 0`],
      color: `white`,
      borderBottom: `none`,
      backgroundColor: `none`,
      boxShadow: `none`
    },

    StatusCardDark: {
      backgroundColor: `#1e2530`
    },

    PostCard,

    PostCardDark: {
      ...PostCard,
      backgroundColor: `#252e3c`,
      borderBottom: `none`,
      color: `white`
    }
  },

  colors,

  fonts: {
    body: fonts.serif,
    heading: fonts.sans,
    monospace: fonts.mono
  },

  fontSizes: [
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '1.875rem',
    '2.25rem',
    '3rem',
    '4rem',
    '4.5rem'
  ],

  layout: {
    container: {
      maxWidth: [``, `94%`, ``, ``, `1200px`],
      py: [2, 3],
      px: [3, 4]
    }
  },

  links: {
    homeNavigation: {
      color: theme => theme.colors.primary,
      display: `block`,
      width: `100%`,
      py: 2,
      textDecoration: `none`,
      '&:not(:last-of-type)': {
        borderBottom: theme => `1px solid ${theme.colors.gray[3]}`
      },
      '&:hover': {
        backgroundColor: theme => console.log(theme.colors.gray) || theme.colors.gray[1]
      }
    }
  },

  styles,

  text: {
    title: {
      color: `primary`,
      fontFamily: `heading`,
      fontSize: 0,
      fontWeight: `550`,
      textTransform: `uppercase`
    }
  },

  variants: {
    cards: {
      dark: {
        backgroundColor: 'teal'
      }
    }
  }
})
