/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const YouTube = ({ title, url }) => (
  <Styled.div sx={{ variant: `styles.VideoWrapper` }}>
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
  </Styled.div>
)

export default YouTube
