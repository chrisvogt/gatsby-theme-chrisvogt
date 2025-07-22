import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'
import PlayTimeChart from './play-time-chart'

const renderWithTheme = component => {
  return renderer.create(<ThemeUIProvider theme={theme}>{component}</ThemeUIProvider>)
}

// Mock D3 to avoid complex DOM manipulation in tests
jest.mock('d3', () => ({
  select: jest.fn().mockReturnValue({
    selectAll: jest.fn().mockReturnValue({
      remove: jest.fn()
    }),
    attr: jest.fn().mockReturnThis(),
    style: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis()
  }),
  max: jest.fn(),
  scaleLinear: jest.fn().mockReturnValue({
    domain: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis()
  }),
  scaleSequential: jest.fn().mockReturnValue({
    domain: jest.fn().mockReturnThis()
  }),
  interpolateViridis: jest.fn(),
  rgb: jest.fn().mockReturnValue({
    brighter: jest.fn()
  }),
  easeElasticOut: {
    amplitude: jest.fn().mockReturnValue({
      period: jest.fn()
    })
  }
}))

describe('PlayTimeChart', () => {
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
    },
    {
      id: 578080,
      displayName: 'PUBG: BATTLEGROUNDS',
      playTimeForever: 12000,
      playTime2Weeks: 60,
      images: {
        icon: 'https://example.com/pubg-icon.jpg'
      }
    }
  ]

  it('renders correctly with sample data', () => {
    const tree = renderWithTheme(<PlayTimeChart games={sampleGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when no games provided', () => {
    const tree = renderWithTheme(<PlayTimeChart games={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when games is null', () => {
    const tree = renderWithTheme(<PlayTimeChart games={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when games is undefined', () => {
    const tree = renderWithTheme(<PlayTimeChart games={undefined} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with games that have zero playtime', () => {
    const gamesWithZeroTime = [
      ...sampleGames,
      {
        id: 123456,
        displayName: 'Unplayed Game',
        playTimeForever: 0,
        playTime2Weeks: null,
        images: {
          icon: 'https://example.com/unplayed-icon.jpg'
        }
      }
    ]
    const tree = renderWithTheme(<PlayTimeChart games={gamesWithZeroTime} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with many games (should limit to top 25)', () => {
    const manyGames = Array.from({ length: 30 }, (_, index) => ({
      id: 100000 + index,
      displayName: `Game ${index + 1}`,
      playTimeForever: Math.max(1000 - index * 30, 10), // Decreasing playtime
      playTime2Weeks: index % 3 === 0 ? 50 + index * 2 : null,
      images: {
        icon: `https://example.com/game-${index + 1}-icon.jpg`
      }
    }))

    const tree = renderWithTheme(<PlayTimeChart games={manyGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})