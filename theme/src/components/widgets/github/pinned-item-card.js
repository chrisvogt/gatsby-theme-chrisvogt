/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

import PropTypes from 'prop-types'

import PlaceholderContent from './renderers/placeholder'
import RepositoryContent from './renderers/repository'

// NOTE(cvogt): this is missing a renderer for `Gist` items
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
  item: PropTypes.object,
  type: PropTypes.oneOf(['Gist', 'placeholder', 'Repository'])
}

export default PinnedItemCard
