import { floatOnHover } from './abstracts/shadows'
import { merge } from 'theme-ui'
import styles, { themePreset } from './styles'

const card = {
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  color: 'var(--theme-ui-colors-panel-text)',
  borderRadius: `3px`,
  boxShadow: `default`,
  flexGrow: 1,
  padding: 3,
  textDecoration: `none`
};

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  serif: 'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  mono: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
};

// const cardBackgroundDark = '#252e3c'
// const pageBackgroundDark = '#2d3748'

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
      borderLeft: theme => `3px solid ${theme.colors.primary}`,
      dark: {
        backgroundColor: 'green'
      }
    },

    metricCard: {
      ...card,
      backgroundColor: `var(--theme-ui-colors-panel-background)`,
      boxShadow: `none`,
      color: 'var(--theme-ui-colors-panel-text)',
      span: {
        fontFamily: `heading`,
        fontWeight: `bold`,
        padding: 2
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

    PostCard: {
      ...card,
      ...floatOnHover,
      backgroundColor: `var(--theme-ui-colors-panel-background)`,
      color: 'var(--theme-ui-colors-panel-text)',
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
  },

  colors: {
    accent: `deeppink`,
    background: `#fcfcfc`,
    'panel-background': `white`,
    'panel-divider': theme => `1px solid ${theme.colors.gray[3]}`,
    'panel-highlight': theme => theme.colors.gray[1],
    modes: {
      dark: {
        background: `#2d3748`,
        'panel-background': `#252e3c`,
        'panel-divider': theme => `1px solid ${theme.colors.gray[8]}`,
        'panel-highlight': theme => theme.colors.gray[8],
        text: `white`
      }
    },
    primary: `#1E90FF`,
    secondary: `#711E9B`,
    secondaryGradient: `linear-gradient(45deg, #4527a0 0%, #711e9b 100%)`,
    text: `#2d3748`
  },

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
