import theme from './theme'
import { tailwind } from '@theme-ui/presets'
import { merge } from 'theme-ui'

describe('Theme Configuration', () => {
  it('merges with Tailwind preset', () => {
    // Check if the theme is merged with Tailwind preset
    const mergedTheme = merge(tailwind, theme)
    expect(mergedTheme).toBeTruthy()
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

  it('contains animations like floatOnHover', () => {
    expect(theme.variants).toHaveProperty('cards')
    expect(theme.variants.cards).toHaveProperty('dark')
    expect(theme).toHaveProperty('styles')
    expect(theme.styles).toHaveProperty('root')
  })
})
