import React from 'react'

import Placeholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

export default () => (
  <Placeholder showLoadingAnimation ready={false} type='media' rows={3}>
    <p>Loading</p>
  </Placeholder>
)
