/** @jsx jsx */
import { jsx } from 'theme-ui'

import Content from './content'
import SwoopTop from '../artwork/swoop-top'

import theme from '../../gatsby-plugin-theme-ui'
import useSiteMetadata from '../../hooks/use-site-metadata'
const { footerText } = useSiteMetadata()

export default () => (
  <div sx={{ variant: `styles.Footer` }}>
    <SwoopTop fill={theme.colors.background} />
    <Content footerText={footerText} />
  </div>
)
