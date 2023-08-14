/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Box, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import PinnedItemCard from './pinned-item-card'

const PinnedItems = ({ isLoading, items = [], placeholderCount = 4 }) => {
  const placeholderItems = Array(placeholderCount).fill({
    __typename: 'placeholder'
  })
  const itemsToRender = isLoading || items.length === 0 ? placeholderItems : items

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Heading
        as='h3'
        sx={{
          mb: 3,
          fontSize: [3, 4]
        }}
      >
        Pinned Items
      </Heading>

      <Themed.p>Pinned items on my GitHub profile.</Themed.p>

      <Themed.div
        sx={{
          display: 'grid',
          gridAutoRows: '1fr',
          gridGap: [3, 3, 3, 4],
          gridTemplateColumns: ['', '', '', 'repeat(2, 1fr)']
        }}
      >
        {itemsToRender.map((item, index) => (
          <Themed.a
            href={item.url}
            key={item.id || index}
            sx={{
              color: `var(--theme-ui-colors-panel-text)`,
              display: `flex`,
              '&:hover, &:focus': {
                textDecoration: `none`
              }
            }}
          >
            <PinnedItemCard item={item} type={item.__typename} />
          </Themed.a>
        ))}
      </Themed.div>
    </Box>
  )
}

PinnedItems.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The pinned items content to render. */
  items: PropTypes.arrayOf(PropTypes.object),
  /** The number of placeholder items to render. */
  placeholderCount: PropTypes.number
}

export default PinnedItems
