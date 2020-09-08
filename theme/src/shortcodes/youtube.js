/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const YouTube = ({ title, url }) => (
  <Styled.div sx={{ variant: `styles.VideoWrapper` }}>
    <iframe
      className='VideoFrame'
      title={title || 'YouTube video'}
      width='560'
      height='315'
      src={url}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  </Styled.div>
)

export default YouTube
