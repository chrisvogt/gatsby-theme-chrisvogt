/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'

export default () => (
  <Box>
    <Heading
      as='h3'
      sx={{
        marginBottom: '1rem'
      }}
    >
      Last Commit
    </Heading>
    <span>Placeholder text.</span>
  </Box>
)
