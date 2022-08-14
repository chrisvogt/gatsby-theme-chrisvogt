import getDefaultFillColor from './get-default-fill-color'

describe('getDefaultFillColor', () => {
  it('selects the dark theme background color when in dark mode', () => {
    const result = getDefaultFillColor()
    expect(result).toEqual('var(--theme-ui-colors-background)')
  })
})
