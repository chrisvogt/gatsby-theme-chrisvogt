import React from 'react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ platform }) => (
  <span>
    View on {platform}
    {'  '}
    <FontAwesomeIcon icon={faExternalLinkAlt} />
  </span>
)
