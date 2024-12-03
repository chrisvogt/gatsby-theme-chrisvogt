import theme, { floatOnHover } from './theme'
import { tailwind } from '@theme-ui/presets'
import { merge } from 'theme-ui'

describe('Theme Configuration', () => {
  describe('a snapshot of the configuration', () => {
    it('matches the snapshot', () => {
      expect(theme).toMatchSnapshot()
    })
  })

  describe('properties that are expected to remain static', () => {
    it('merges with Tailwind preset', () => {
      const mergedTheme = merge(tailwind, theme)
      expect(mergedTheme).toBeTruthy()
    })

    it('defaults the color mode to dark', () => {
      expect(theme.config.initialColorModeName).toBe('dark')
      expect(theme.config.useColorSchemeMediaQuery).toBe(false)
      expect(theme.config).toHaveProperty('useLocalStorage')
    })

    it('contains custom fonts', () => {
      expect(theme.fonts).toHaveProperty('sans')
      expect(theme.fonts).toHaveProperty('serif')
      expect(theme.fonts).toHaveProperty('mono')
    })

    it('has font sizes', () => {
      expect(theme.fontSizes).toContain('.875rem')
      expect(theme.fontSizes).toContain('4rem')
    })

    it('has color modes configured', () => {
      expect(theme.colors.modes.dark).toHaveProperty('background', '#1e1e2f')
      expect(theme.colors.modes.dark).toHaveProperty('text', '#fff')
    })

    it('contains custom card styles', () => {
      expect(theme.cards.primary).toHaveProperty('background')
      expect(theme.cards.actionCard).toHaveProperty('borderLeft')
    })

    it('has styles for gradient banners', () => {
      expect(theme.styles.GradientBanner).toHaveProperty('backgroundImage')
    })

    it('defines card variants', () => {
      expect(theme.variants.cards.dark).toHaveProperty('backgroundColor', 'teal')
    })

    it('exports floatOnHover animation', () => {
      expect(floatOnHover).toHaveProperty('transition')
    })

    it('applies floatOnHover to PostCard', () => {
      const postCardStyles = theme.cards.PostCard
      expect(postCardStyles).toMatchObject(floatOnHover)
    })

    it('has reduced motion preference for emojis', () => {
      const reducedMotionStyles = theme.global['@media (prefers-reduced-motion: reduce)']
      expect(reducedMotionStyles['.emoji']).toHaveProperty('animation', 'none !important')
    })

    it('defines glassmorphism panel styles', () => {
      const panelStyles = theme.cards.PostCard
      expect(panelStyles).toHaveProperty('borderRadius', '10px')
    })

    it('has layout configuration', () => {
      const containerStyles = theme.layout.container
      expect(containerStyles.maxWidth).toContain('1440px')
    })

    it('defines highlight keyframe animation', () => {
      const highlightAnimation = theme.styles.GradientBanner['@keyframes highlight']
      expect(highlightAnimation).toHaveProperty('100%')
      expect(highlightAnimation['100%']).toHaveProperty('backgroundPosition', '0 0, 0 0')
    })

    it('defines wobble keyframe animation', () => {
      const wobbleAnimation = theme.global['@keyframes wobble']
      expect(wobbleAnimation['0%, 100%']).toHaveProperty('transform', 'rotate(0deg)')
      expect(wobbleAnimation['15%']).toHaveProperty('transform', 'rotate(-15deg)')
    })

    it('defines button variants', () => {
      expect(theme.buttons.primary).toHaveProperty('bg', 'primary')
      expect(theme.buttons.secondary).toHaveProperty('bg', 'secondary')
      expect(theme.buttons.gray).toHaveProperty('bg', 'gray')
    })

    it('defines badge variants', () => {
      expect(theme.badges.primary).toHaveProperty('bg', 'primary')
      expect(theme.badges.outline).toHaveProperty('boxShadow', 'inset 0 0 0 1px')
    })

    it('defines GitHubCardFooter styles', () => {
      const footerStyles = theme.styles.GitHubCardFooter
      expect(footerStyles).toHaveProperty('display', 'flex')
      expect(footerStyles).toHaveProperty('justifyContent', 'space-between')
    })

    it('defines PageFooter styles', () => {
      const pageFooterStyles = theme.styles.PageFooter
      expect(pageFooterStyles).toHaveProperty('zIndex', '10')
      expect(pageFooterStyles.a).toHaveProperty('color', 'text')
    })

    it('defines Book component styles', () => {
      const bookStyles = theme.styles.Book
      expect(bookStyles).toHaveProperty('filter')
      expect(bookStyles['&:hover, &:focus']).toHaveProperty('transform', 'scale(1.01)')
    })

    it('defines responsive container styles', () => {
      const containerStyles = theme.layout.container
      expect(containerStyles).toHaveProperty('py', [2, 3])
      expect(containerStyles).toHaveProperty('px', [3, 4])
    })

    it('defines UserProfile styles', () => {
      const userProfileStyles = theme.cards.UserProfile
      expect(userProfileStyles.padding(theme)).toEqual(['none', `0 ${theme.space[3]} 0 0`])
      expect(userProfileStyles).toHaveProperty('color', 'white')
    })

    it('defines InstagramItem styles', () => {
      const instagramStyles = theme.styles.InstagramItem
      expect(instagramStyles).toHaveProperty('cursor', 'pointer')
      expect(instagramStyles).toHaveProperty('borderRadius', '8px')
    })

    it('defines Header styles', () => {
      const headerStyles = theme.styles.Header
      expect(headerStyles).toHaveProperty('alignItems', 'center')
      expect(headerStyles).toHaveProperty('transition', 'all 0.3s ease-in-out')
    })

    it('defines VideoWrapper styles', () => {
      const videoWrapperStyles = theme.styles.VideoWrapper
      expect(videoWrapperStyles).toHaveProperty('position', 'relative')
      expect(videoWrapperStyles).toHaveProperty('paddingBottom', '56.25%')
      expect(videoWrapperStyles.iframe).toHaveProperty('position', 'absolute')
    })
  })
})
