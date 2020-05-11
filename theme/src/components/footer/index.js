/** @jsx jsx */
import { jsx } from 'theme-ui'

import Content from './content'
import SwoopTop from '../artwork/swoop-top'

import theme from '../../gatsby-plugin-theme-ui'

export default () => (
  <div sx={{ variant: `styles.Footer` }}>
    <SwoopTop fill={theme.colors.background} />
    <Content />
  </div>
)
