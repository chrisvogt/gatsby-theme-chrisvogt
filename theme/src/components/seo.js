import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import useSiteMetadata from '../hooks/use-site-metadata'

import {
  getBaseURL,
  getTwitterUsername,
  getTitleTemplate
} from '../selectors/metadata'

const SEO = ({ title, description, image: imageURL, pathname, article }) => {
  const metadata = useSiteMetadata()

  const baseURL = getBaseURL(metadata)
  const titleTemplate = getTitleTemplate(metadata)
  const twitterUsername = getTwitterUsername(metadata)

  const fullPathURL = baseURL ? `${baseURL}${pathname}` : '/'

  return (
    <>
      <Helmet title={title} titleTemplate={titleTemplate}>
        <meta name="description" content={description} />
        <meta name="image" content={imageURL} />

        <meta property="og:url" content={fullPathURL} />

        {article && <meta property="og:type" content="article" />}

        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {imageURL && <meta property="og:image" content={imageURL} />}
        <meta name="twitter:card" content="summary_large_image" />
        {twitterUsername && (
          <meta name="twitter:creator" content={twitterUsername} />
        )}
        {title && <meta name="twitter:title" content={title} />}
        {imageURL && <meta name="twitter:image" content={imageURL} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
      </Helmet>
    </>
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
