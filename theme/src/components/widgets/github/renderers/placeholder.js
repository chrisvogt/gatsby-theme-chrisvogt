/** @jsx jsx */
import { jsx } from 'theme-ui'

import Placeholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

import PinnedItemPlaceholder from '../placeholders/pinned-item-placeholder'

export default () => (
  <Placeholder
    customPlaceholder={PinnedItemPlaceholder}
    ready={false}
    showLoadingAnimation
  >
    <p>Loading</p>
  </Placeholder>
)
