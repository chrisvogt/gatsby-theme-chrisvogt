import React from 'react'
import PropTypes from 'prop-types'
import { useThemeUI } from 'theme-ui'

import useSiteMetadata from '../hooks/use-site-metadata'

import { getLanguageCode, getTitle, getTitleTemplate, getTwitterUsername } from '../selectors/metadata'

/**
 * SEO
 *
 * Updates <head> tags.
 */
const Seo = ({
  article,
  children,
  description,
  image: imageURL,
  keywords,
  title: pageTitle,
}) => {
  const metadata = useSiteMetadata()
  const { theme } = useThemeUI()

  const languageCode = getLanguageCode(metadata)
  const siteTitle = getTitle(metadata)
  const titleTemplate = getTitleTemplate(metadata)
  const twitterUsername = getTwitterUsername(metadata)

  const title = titleTemplate.replace(/%s/g, pageTitle) || siteTitle

  return (
    <>
      <html lang={languageCode} />
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {imageURL && <meta name='image' content={imageURL} />}
      <meta name='theme-color' content={theme.colors.background} />
      <meta property='og:title' content={title} />
      {keywords && <meta name='keywords' content={keywords} />}
      {article && <meta property='og:type' content='article' />}
      {description && <meta property='og:description' content={description} />}
      {imageURL && <meta property='og:image' content={imageURL} />}
      <meta name='twitter:card' content='summary_large_image' />
      {twitterUsername && <meta name='twitter:creator' content={twitterUsername} />}
      <meta name='twitter:title' content={title} />
      {imageURL && <meta name='twitter:image' content={imageURL} />}
      {description && <meta name='twitter:description' content={description} />}
      <link rel='webmention' href='https://webmention.io/www.chrisvogt.me/webmention' />
      {children}
    </>
  )
}

Seo.propTypes = {
  article: PropTypes.bool,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
  pathname: PropTypes.string,
  title: PropTypes.string
}

export default Seo
