/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export const YouTubeEmbed = ({ title, url }) => (
  <Styled.div className='VideoWrapper'>
    <iframe
      title={title || 'YouTube video'}
      width='560'
      height='315'
      src={url}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen
    ></iframe>
  </Styled.div>
)
