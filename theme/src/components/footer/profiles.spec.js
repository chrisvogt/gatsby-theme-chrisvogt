import React from 'react'
import renderer from 'react-test-renderer'

import Profiles from './profiles'
import { TestProvider } from '../../testUtils'
import useSocialProfiles from '../../hooks/use-social-profiles'

jest.mock('../../hooks/use-social-profiles')

const mockProfiles = [
  {
    icon: {
      reactIcon: 'faGithub'
    },
    id: 'github',
    displayName: 'GitHub',
    href: 'https://www.github.com',
    slug: 'github'
  },
  {
    icon: {
      reactIcon: 'faInstagram'
    },
    id: 'instagram',
    displayName: 'Instagram',
    href: 'https://www.instagram.com',
    slug: 'instagram'
  },
  {
    icon: {
      reactIcon: 'faLinkedin'
    },
    id: 'linkedin',
    displayName: 'LinkedIn',
    href: 'https://www.linkedin.com',
    slug: 'linkedIn'
  },
  {
    icon: {
      reactIcon: 'faTwitter'
    },
    id: 'twitter',
    displayName: 'Twitter',
    href: 'https://www.twitter.com',
    slug: 'Twitter'
  }
]

describe('Profiles', () => {
  beforeEach(() => {
    useSocialProfiles.mockImplementation(() => mockProfiles)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <TestProvider>
          <Profiles />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
