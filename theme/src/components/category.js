/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

const Category = ({ sx = {}, type }) => {
  const category = type.replace('photography/travel', 'Travel Photography')
  return (
    <Themed.div sx={{ variant: `text.title`, fontSize: [1], ...sx }}>
      {category}
    </Themed.div>
  )
}

export default Category
