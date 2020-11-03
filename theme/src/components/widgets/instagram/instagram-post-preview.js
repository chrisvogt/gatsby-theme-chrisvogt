/** @jsx jsx */
import { Box, Button, Flex, Grid, jsx } from 'theme-ui'
// import { Grid } from '@theme-ui/components'

import Modal from 'react-modal'

const InstagramPostPreview = ({ post }) => {
  const {
    caption,
    cdnMediaURL,
    id,
    permalink,
    onPostClose,
    timestamp,
    username
  } = post

  return (
    <Grid gap='0px 5px' columns={[`1fr`, ``, `0.7fr 1.3fr`]}>
      <Flex
        sx={{
          background: 'blue',
          overflow: `hidden`,
          alignItems: `center`,
          justifyContent: `center`
        }}
      >
        <img
          crossOrigin='anonymous'
          className='instagram-item-image'
          src={`${cdnMediaURL}?h=800&fm=webp&auto=format`}
          height='300px'
          alt='Instagram post thumbnail'
          sx={{
            transition: `all 1.5s ease`
          }}
        />
      </Flex>
      <Box p={2} bg='muted'>
        <p>{username}</p>
        <p>{timestamp}</p>
        <p>{caption}</p>
        <Button onClick={onPostClose}>Close</Button>
      </Box>
    </Grid>
  )
}

export default InstagramPostPreview
