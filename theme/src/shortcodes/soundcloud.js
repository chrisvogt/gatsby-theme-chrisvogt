/** @jsx jsx */
import { jsx } from 'theme-ui'

const buildSoundCloudEmbedURL = trackId =>
  `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`

const SoundCloud = ({ title, soundcloudId }) => (
  <iframe
    allow='autoplay'
    frameborder='no'
    height='166'
    scrolling='no'
    src={buildSoundCloudEmbedURL(soundcloudId)}
    title={title || 'Song on SoundCloud'}
    width='100%'
  ></iframe>
)

export default SoundCloud
