/** @jsx jsx */
import { jsx } from 'theme-ui'

import Placeholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

import PinnedItemPlaceholder from '../placeholders/PinnedItemPlaceholder'

export default () => (
  <Placeholder
    customPlaceholder={PinnedItemPlaceholder}
    showLoadingAnimation
    ready={false}
  >
    <p>Loading</p>
  </Placeholder>
)
