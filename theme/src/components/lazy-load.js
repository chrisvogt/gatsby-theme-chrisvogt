/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

const DefaultPlaceholder = ({
  height = '100%',
  width = '100%'
}) => (
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
)

/**
 * Lazy Loader
 *
 * Hides a component until it's been visible in the viewport.
 */
const LazyLoad = ({
  children,
  placeholder = DefaultPlaceholder
}) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  const onChange = isVisible => {
    if (!hasBeenVisible && isVisible) {
      setHasBeenVisible(true)
    }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      {hasBeenVisible ? children : placeholder}
    </VisibilitySensor>
  )
}

export default LazyLoad
