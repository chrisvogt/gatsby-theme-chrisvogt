/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders'

import 'react-placeholder/lib/reactPlaceholder.css'

export default () => (
  <div className='show-loading-animation'>
    <Flex>
      <div>
        <RectShape color='#efefef' style={{ width: 40, height: 40, marginBottom: `2em` }} />
      </div>
      <div sx={{ width: `100%`, height: `100%` }}>
        <TextBlock rows={2} color='#efefef' />
      </div>
    </Flex>
    <TextBlock rows={3} color='#efefef' />
  </div>
)
