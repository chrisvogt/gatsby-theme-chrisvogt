/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const { footerText } = useSiteMetadata()
  return <Fragment>{footerText}</Fragment>
}
