import theme, { floatOnHover } from './theme'
import { tailwind } from '@theme-ui/presets'
import { merge } from 'theme-ui'

describe('Theme Configuration', () => {
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
})
