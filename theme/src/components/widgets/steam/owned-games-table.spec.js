import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import OwnedGamesTable, { TimeSpent } from './owned-games-table'

const renderWithColorMode = component => {
  return renderer.create(<ThemeUIProvider theme={theme}>{component}</ThemeUIProvider>)
}

describe('OwnedGamesTable', () => {
  it('renders correctly with sample data', () => {
    const sampleGames = [
      {
        id: 255710,
        displayName: 'Cities: Skylines',
        playTimeForever: 45441,
        playTime2Weeks: 120,
        images: {
          icon: 'https://example.com/cities-icon.jpg'
        }
      },
      {
        id: 346110,
        displayName: 'ARK: Survival Evolved',
        playTimeForever: 16670,
        playTime2Weeks: null,
        images: {
          icon: 'https://example.com/ark-icon.jpg'
        }
      }
    ]

    const tree = renderWithColorMode(<OwnedGamesTable games={sampleGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when no games provided', () => {
    const tree = renderWithColorMode(<OwnedGamesTable games={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when games is null', () => {
    const tree = renderWithColorMode(<OwnedGamesTable games={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when games is undefined', () => {
    const tree = renderWithColorMode(<OwnedGamesTable games={undefined} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with more than 10 games and shows remaining games section', () => {
    const manyGames = Array.from({ length: 15 }, (_, index) => ({
      id: 100000 + index,
      displayName: `Game ${index + 1}`,
      playTimeForever: 1000 + index * 100,
      playTime2Weeks: index % 2 === 0 ? 50 + index * 10 : null,
      images: {
        icon: `https://example.com/game-${index + 1}-icon.jpg`
      }
    }))

    const tree = renderWithColorMode(<OwnedGamesTable games={manyGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with exactly 11 games and shows singular "other game"', () => {
    const elevenGames = Array.from({ length: 11 }, (_, index) => ({
      id: 100000 + index,
      displayName: `Game ${index + 1}`,
      playTimeForever: 1000 + index * 100,
      playTime2Weeks: index % 2 === 0 ? 50 + index * 10 : null,
      images: {
        icon: `https://example.com/game-${index + 1}-icon.jpg`
      }
    }))

    const tree = renderWithColorMode(<OwnedGamesTable games={elevenGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with exactly 12 games and shows plural "other games"', () => {
    const twelveGames = Array.from({ length: 12 }, (_, index) => ({
      id: 100000 + index,
      displayName: `Game ${index + 1}`,
      playTimeForever: 1000 + index * 100,
      playTime2Weeks: index % 2 === 0 ? 50 + index * 10 : null,
      images: {
        icon: `https://example.com/game-${index + 1}-icon.jpg`
      }
    }))

    const tree = renderWithColorMode(<OwnedGamesTable games={twelveGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TimeSpent', () => {
  it('renders humanized time correctly', () => {
    const tree = renderer.create(<TimeSpent timeInMs={5 * 60 * 1000} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
