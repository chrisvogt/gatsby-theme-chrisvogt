import colors from './abstracts/colors'
import fonts from './abstracts/fonts'
import styles, {
  card,
  infoCard,
  floatOnHover,
  themePreset,
  PostCard
} from './styles'
import { merge } from 'theme-ui'

export default merge(themePreset, {
  useColorSchemeMediaQuery: true,
  cards: {
    /* The <Card /> default style. Used when no variant is defined. */
    primary: {
      ...card
    },

    actionCard: {
      ...card,
      ...floatOnHover,
      borderLeft: theme => `2px solid ${theme.colors.primary}`
    },

    actionCardDark: {
      ...card,
      ...floatOnHover,
      backgroundColor: `#252e3c`,
      borderBottom: `none`,
      borderLeft: theme => `2px solid ${theme.colors.primary}`,
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
      borderLeft: `2px solid #fefefe`,
      borderBottom: `none`,
      color: `white`
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
  colors: {
    ...colors
  },
  fonts: {
    body: fonts.sans,
    heading: fonts.serif,
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
  styles,
  text: {
    title: {
      color: `primary`,
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
