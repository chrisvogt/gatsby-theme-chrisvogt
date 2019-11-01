/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import PinnedItemCard from './pinned-item-card'

const PinnedItems = ({ isLoading, pinnedItems = [] }) => {
  const placeholderItems = Array(4).fill({ __typename: 'placeholder' })
  const items = isLoading ? placeholderItems : pinnedItems

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Pinned Items
      </Heading>
      <Styled.div
        sx={{
          display: 'grid',
          gridAutoRows: '1fr',
          gridGap: '1rem',
          gridTemplateColumns: ['', '', 'repeat(2, 1fr)']
        }}
      >
        {items.map((item, index) => (
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
