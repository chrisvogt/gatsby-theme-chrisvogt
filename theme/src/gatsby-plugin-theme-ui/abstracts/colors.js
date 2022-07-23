export default {
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
}

export const cardBackgroundDark = '#252e3c'
export const pageBackgroundDark = '#2d3748'
