import { mount } from 'enzyme'
import { useThemeUI } from 'theme-ui'
import React from 'react'
import Helmet from 'react-helmet'

import SEO from './seo'
import useSiteMetadata from '../hooks/use-site-metadata'

jest.mock('../hooks/use-site-metadata')
jest.mock('theme-ui')

const mockSiteMetadata = {
  languageCode: 'en',
  title: 'My Personal Blog & Portfolio',
  titleTemplate: '%s | My Test Site'
}

const mockBackgroundColor = '#aeaeae'
const mockThemeUIResult = {
  theme: {
    colors: {
      background: mockBackgroundColor
    }
  }
}

describe.only('SEO', () => {
  useSiteMetadata.mockImplementation(() => mockSiteMetadata)
  useThemeUI.mockImplementation(() => mockThemeUIResult)

  describe('page title', () => {
    it('defaults to the site title', () => {
      const wrapper = mount(<SEO />)
      console.log('---------- PEEK', Helmet.peek(wrapper))
      expect(Helmet.peek().title).toBe(
        'My Personal Blog & Portfolio | My Test Site'
      )
    })

    it.skip('accepts a custom page title', () => {
      const wrapper = mount(<SEO title='derp' />)
      expect(Helmet.peek().title).toBe('derp | My Test Site')
    })
  })
})
