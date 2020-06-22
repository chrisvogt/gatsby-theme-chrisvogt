import React from 'react'
import renderer from 'react-test-renderer'

import Profiles from './profiles'
import useSocialProfiles from '../../hooks/use-social-profiles'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'

jest.mock('../../hooks/use-social-profiles')

describe('Footer/Profiles', () => {
  describe('snapshots', () => {
    it('matches the loading state snapshot', () => {
      useSocialProfiles.mockImplementationOnce(() => ({
        isLoading: true,
        profiles: []
      }))
      const tree = renderer.create(<Profiles />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('matches the success state snapshot', () => {
      const mockProfiles = [
        {
          IconComponent: faTwitter,
          profile: {
            displayName: 'Fake Social Network',
            slug: 'fake-social-network',
            href: 'https://fake-social-network.com/my-profile'
          }
        }
      ]
      useSocialProfiles.mockImplementationOnce(() => ({
        isLoading: false,
        profiles: mockProfiles
      }))
      const tree = renderer.create(<Profiles />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
