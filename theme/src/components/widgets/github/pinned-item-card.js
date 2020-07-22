/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'

import PropTypes from 'prop-types'

import isDarkMode from '../../../helpers/isDarkMode'

import PlaceholderContent from './renderers/placeholder'
import RepositoryContent from './renderers/repository'

const PLACEHOLDER = 'placeholder'
const REPOSITORY = 'Repository'

const rendererRegistry = {
  [PLACEHOLDER]: PlaceholderContent,
  [REPOSITORY]: RepositoryContent
}

const PinnedItemCard = ({ item, type }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'actionCardDark' : 'actionCard'

  return (
    <Card variant={variant}>
      {rendererRegistry[type] && rendererRegistry[type](item)}
    </Card>
  )
}

PinnedItemCard.propTypes = {
  /** The pinned item content. */
  item: PropTypes.object,
  /** The type of pinned item. */
  type: PropTypes.oneOf([PLACEHOLDER, REPOSITORY])
}

PinnedItemCard.defaultProps = {
  type: PLACEHOLDER
}

export default PinnedItemCard
