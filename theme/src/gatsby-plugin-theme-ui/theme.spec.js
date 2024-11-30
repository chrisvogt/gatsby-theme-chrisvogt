import theme, { floatOnHover } from './theme'
import { tailwind } from '@theme-ui/presets'
import { merge } from 'theme-ui'

describe('Theme Configuration', () => {
  it('merges with Tailwind preset', () => {
    // Check if the theme is merged with Tailwind preset
    const mergedTheme = merge(tailwind, theme)
    expect(mergedTheme).toBeTruthy()
  })

  it('defaults the color mode to dark', () => {
    expect(theme.config.useColorSchemeMediaQuery).toBe(false)
    expect(theme.config.initialColorModeName).toBe('dark')
    expect(theme.config).toHaveProperty('useLocalStorage')
  })

  it('contains custom fonts', () => {
    expect(theme.fonts).toHaveProperty('sans')
    expect(theme.fonts).toHaveProperty('serif')
    expect(theme.fonts).toHaveProperty('mono')
  })

  it('has color modes configured', () => {
    expect(theme.colors).toHaveProperty('modes')
    expect(theme.colors.modes).toHaveProperty('dark')
    expect(theme.colors.modes.dark).toHaveProperty('background')
    expect(theme.colors.modes.dark).toHaveProperty('text')
  })

  it('contains custom card styles', () => {
    expect(theme.cards).toHaveProperty('primary')
    expect(theme.cards.primary).toHaveProperty('background')
    expect(theme.cards).toHaveProperty('actionCard')
    expect(theme.cards.actionCard).toHaveProperty('borderLeft')
  })

  it('has styles for gradient banners', () => {
    expect(theme.styles).toHaveProperty('GradientBanner')
    expect(theme.styles.GradientBanner).toHaveProperty('backgroundImage')
    expect(theme.styles).toHaveProperty('GradientBannerDark')
    expect(theme.styles.GradientBannerDark).toHaveProperty('backgroundImage')
  })

  it('supports custom button variants', () => {
    expect(theme.buttons).toHaveProperty('primary')
    expect(theme.buttons.primary).toHaveProperty('bg')
    expect(theme.buttons).toHaveProperty('secondary')
    expect(theme.buttons.secondary).toHaveProperty('bg')
  })

  // Test floatOnHover directly from the export
  it('exports floatOnHover animation', () => {
    expect(floatOnHover).toHaveProperty('transition')
    expect(floatOnHover['&:hover, &:focus']).toHaveProperty('transform', 'scale(1.015)')
  })

  // Check if it's used in specific components like PostCard
  it('applies floatOnHover to PostCard', () => {
    const postCardStyles = theme.cards.PostCard
    expect(postCardStyles).toMatchObject(floatOnHover)
  })

  it('applies floatOnHover to InstagramItem', () => {
    const instagramItemStyles = theme.styles.InstagramItem
    expect(instagramItemStyles).toMatchObject(floatOnHover)
  })

  it('has reduced motion preference for emojis', () => {
    const reducedMotionStyles = theme.global?.['@media (prefers-reduced-motion: reduce)']
    
    expect(reducedMotionStyles).toBeDefined()
    expect(reducedMotionStyles['.emoji']).toBeDefined()
    expect(reducedMotionStyles['.emoji']).toHaveProperty('animation', 'none !important')
  })
})
