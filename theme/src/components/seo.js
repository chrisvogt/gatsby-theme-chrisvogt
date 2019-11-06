import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useThemeUI } from 'theme-ui'

import useSiteMetadata from '../hooks/use-site-metadata'

import {
  getTitle,
  getTitleTemplate,
  getTwitterUsername
} from '../selectors/metadata'

const SEO = ({ title: pageTitle, description, image: imageURL, article }) => {
  const metadata = useSiteMetadata()
  const { theme } = useThemeUI()

  const siteTitle = getTitle(metadata)
  const titleTemplate = getTitleTemplate(metadata)
  const twitterUsername = getTwitterUsername(metadata)

  const title = pageTitle || siteTitle

  return (
    <Helmet title={title} titleTemplate={titleTemplate}>
      <meta name='description' content={description} />
      <meta name='image' content={imageURL} />

      <meta name='theme-color' content={theme.colors.background} />

      <meta property='og:title' content={title} />
      {article && <meta property='og:type' content='article' />}
      {description && <meta property='og:description' content={description} />}
      {imageURL && <meta property='og:image' content={imageURL} />}
      <meta name='twitter:card' content='summary_large_image' />

      {twitterUsername && (
        <meta name='twitter:creator' content={twitterUsername} />
      )}
      <meta name='twitter:title' content={title} />
      {imageURL && <meta name='twitter:image' content={imageURL} />}
      {description && <meta name='twitter:description' content={description} />}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool
}
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false
}

export default SEO
