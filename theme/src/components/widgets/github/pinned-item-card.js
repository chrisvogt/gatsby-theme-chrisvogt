/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

import PropTypes from 'prop-types'

import PlaceholderContent from './renderers/placeholder'
import RepositoryContent from './renderers/repository'

const rendererMap = {
  placeholder: PlaceholderContent,
  Repository: RepositoryContent
}

const PinnedItemCard = ({ item, type }) => (
  <Card sx={{ variant: `styles.RepositoryCard` }}>
    {rendererMap[type] && rendererMap[type](item)}
  </Card>
)

PinnedItemCard.propTypes = {
  /** The pinned item content. */
  item: PropTypes.object,
  /** The type of pinned item. */
  type: PropTypes.oneOf(['placeholder', 'Repository'])
}

export default PinnedItemCard
