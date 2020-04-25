/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

const LazyLoad = props => {
  const { children, height = '100%', width = `100%` } = props

  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  const onChange = isVisible => {
    if (!hasBeenVisible && isVisible) {
      setHasBeenVisible(true)
    }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      {hasBeenVisible ? (
        children
      ) : (
        <div
          sx={{
            minHeight: `1px`,
            minWidth: `1px`,
            height,
            width
          }}
        >
          {' '}
        </div>
      )}
    </VisibilitySensor>
  )
}

export default LazyLoad
