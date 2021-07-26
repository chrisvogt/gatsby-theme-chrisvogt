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

describe('SEO', () => {
  useSiteMetadata.mockImplementation(() => mockSiteMetadata)
  useThemeUI.mockImplementation(() => mockThemeUIResult)

  describe('page title', () => {
    it('defaults to the site title', () => {
      mount(<SEO />)
      expect(Helmet.peek().title).toBe(
        'My Personal Blog & Portfolio | My Test Site'
      )
    })

    it('accepts a custom page title', () => {
      mount(<SEO title='derp' />)
      expect(Helmet.peek().title).toBe('derp | My Test Site')
    })
  })
})
