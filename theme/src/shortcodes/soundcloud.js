/** @jsx jsx */
import { jsx } from 'theme-ui'

const buildSoundCloudEmbedURL = trackId =>
  `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`

const SoundCloud = ({ soundcloudId }) => (
  <iframe
    width='100%'
    height='166'
    scrolling='no'
    frameborder='no'
    allow='autoplay'
    src={buildSoundCloudEmbedURL(soundcloudId)}
  ></iframe>
)

export default SoundCloud
