import React from 'react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
  <span>
    View on GitHub&nbsp;&nbsp;
    <FontAwesomeIcon icon={faExternalLinkAlt} />
  </span>
)
