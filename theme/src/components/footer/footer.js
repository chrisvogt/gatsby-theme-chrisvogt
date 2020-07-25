/** @jsx jsx */
import { jsx } from 'theme-ui'

import Content from './content'
import SwoopTop from '../artwork/swoop-top'
import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const { footerText } = useSiteMetadata()
  return (
    <div sx={{ variant: `styles.PageFooter` }}>
      <SwoopTop />
      <Content footerText={footerText} />
    </div>
  )
}
