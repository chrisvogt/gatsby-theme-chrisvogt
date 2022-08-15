import colors from './abstracts/colors'
import fonts from './abstracts/fonts'

import { card, metricCard, PostCard } from './components/card'

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
      borderBottom: `none`, // from actionCardDark
      borderLeft: theme => `3px solid ${theme.colors.primary}`
    },

    metricCard: {
      ...card,
      ...metricCard
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

    PostCard
  },

  colors,

  fonts: {
    body: fonts.serif,
    heading: fonts.sans,
    monospace: fonts.mono
  },

  fontSizes: ['0.875rem', '1rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem', '4rem', '4.5rem'],

  layout: {
    container: {
      maxWidth: [``, `94%`, ``, ``, `1440px`],
      py: [2, 3],
      px: [3, 4]
    }
  },

  links: {
    homeNavigation: {
      color: 'var(--theme-ui-colors-primary)',
      display: `block`,
      py: 2,
      textDecoration: `none`,
      '&:not(:last-of-type)': {
        borderBottom: 'var(--theme-ui-colors-panel-divider)'
      },
      '&:hover, &:focus': {
        backgroundColor: 'var(--theme-ui-colors-panel-highlight)'
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
