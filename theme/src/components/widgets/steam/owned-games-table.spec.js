import React from 'react'
import renderer from 'react-test-renderer'
import OwnedGamesTable, { TimeSpent } from './owned-games-table'

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

    const tree = renderer.create(<OwnedGamesTable games={sampleGames} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when no games provided', () => {
    const tree = renderer.create(<OwnedGamesTable games={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty state when games is null', () => {
    const tree = renderer.create(<OwnedGamesTable games={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TimeSpent', () => {
  it('renders humanized time correctly', () => {
    const tree = renderer.create(<TimeSpent timeInMs={5 * 60 * 1000} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
