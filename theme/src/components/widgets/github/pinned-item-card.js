/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

import PropTypes from 'prop-types'

import PlaceholderContent from './renderers/placeholder'
import RepositoryContent from './renderers/repository'

const PLACEHOLDER = 'placeholder'
const REPOSITORY = 'Repository'

const rendererRegistry = {
  [PLACEHOLDER]: PlaceholderContent,
  [REPOSITORY]: RepositoryContent
}

const PinnedItemCard = ({ item, type = PLACEHOLDER }) => (
  <Card variant='actionCard'>{rendererRegistry[type] && rendererRegistry[type](item)}</Card>
)

PinnedItemCard.propTypes = {
  /** The pinned item content. */
  item: PropTypes.object,
  /** The type of pinned item. */
  type: PropTypes.oneOf([PLACEHOLDER, REPOSITORY])
}

export default PinnedItemCard
