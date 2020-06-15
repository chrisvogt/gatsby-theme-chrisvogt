/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'

const DefaultPlaceholder = () => (
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
 * Hides a component until it's been visible in the viewport.
 */
const LazyLoad = ({ children }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  const onChange = isVisible => {
    if (!hasBeenVisible && isVisible) {
      setHasBeenVisible(true)
    }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      {hasBeenVisible ? children : DefaultPlaceholder}
    </VisibilitySensor>
  )
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  placholder: PropTypes.element,
  width: PropTypes.string
}

LazyLoad.defaultProps = {
  height: '100%',
  placholder: DefaultPlaceholder,
  width: '100%'
}

export default LazyLoad
