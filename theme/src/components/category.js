/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

const Category = ({ sx = {}, type }) => {
  const category = type
    .replace('photography/travel', 'Travel Photography')
    .replace('photography/events', 'Event Photography')
    .replace('music/piano-covers', 'Piano Covers')

  return <Themed.div sx={{ variant: 'text.title', fontSize: [1], ...sx }}>{category}</Themed.div>
}

export default Category
