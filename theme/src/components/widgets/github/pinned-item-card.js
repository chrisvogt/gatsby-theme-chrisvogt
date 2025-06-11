/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

import PlaceholderContent from './renderers/placeholder'
import RepositoryContent from './renderers/repository'

const PLACEHOLDER = 'placeholder'
const REPOSITORY = 'Repository'

const rendererRegistry = {
  [PLACEHOLDER]: PlaceholderContent,
  [REPOSITORY]: RepositoryContent
}

const PinnedItemCard = ({ item, type = PLACEHOLDER }) => (
  <Card
    variant='actionCard'
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}
  >
    {rendererRegistry[type] && rendererRegistry[type](item)}
  </Card>
)

export default PinnedItemCard
