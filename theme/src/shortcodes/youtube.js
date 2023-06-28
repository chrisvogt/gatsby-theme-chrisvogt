/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

const YouTube = ({ title, url }) => (
  <Themed.div sx={{ variant: `styles.VideoWrapper` }}>
    <iframe
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      className='VideoFrame'
      frameBorder='0'
      height='315'
      src={url}
      title={title || 'Video on YouTube'}
      width='560'
    ></iframe>
  </Themed.div>
)

export default YouTube
