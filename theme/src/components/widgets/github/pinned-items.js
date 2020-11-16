/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import PinnedItemCard from './pinned-item-card'

const PinnedItems = ({ items = [] }) => {
  const placeholderItems = Array(4).fill({ __typename: 'placeholder' })
  const itemsToRender = items.length === 0 ? placeholderItems : items

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Pinned Items
      </Heading>

      <Styled.div
        sx={{
          display: 'grid',
          gridAutoRows: '1fr',
          gridGap: [3, 3, 3, 4],
          gridTemplateColumns: ['', '', '', 'repeat(2, 1fr)']
        }}
      >
        {itemsToRender.map((item, index) => (
          <Styled.a
            href={item.url}
            key={item.id || index}
            sx={{
              display: `flex`,
              '&:hover, &:focus': {
                textDecoration: `none`
              }
            }}
          >
            <PinnedItemCard item={item} type={item.__typename} />
          </Styled.a>
        ))}
      </Styled.div>
    </Box>
  )
}

PinnedItems.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool.isRequired,
  /** The pinned items content to render. */
  items: PropTypes.arrayOf(PropTypes.object)
}

export default PinnedItems
