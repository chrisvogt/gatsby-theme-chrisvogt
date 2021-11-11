import getDefaultFillColor from "./get-default-fill-color"

const mockDarkColor = 'mock-dark-background-color'
const mockLightColor = 'mock-light-background-color'

const themeFixture = {
  colors: {
    background: mockLightColor,
    modes: {
      dark: {
        background: mockDarkColor
      }
    }
  }
}

describe('getDefaultFillColor', () => {
  it('selects the dark theme background color when in dark mode', () => {
    const result = getDefaultFillColor({
      colorMode: 'dark',
      theme: themeFixture
    })
    expect(result).toEqual(mockDarkColor)
  })

  it('defaults to the theme background color', () => {
    const result = getDefaultFillColor({
      theme: themeFixture
    })
    expect(result).toEqual(mockLightColor)
  })
})
