/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import { usePopperTooltip } from 'react-popper-tooltip'
import getIsDarkMode from '../helpers/isDarkMode'
import 'react-popper-tooltip/dist/styles.css'

const Tooltip = ({ children, tooltip, hideArrow, ...props }) => {
  const { colorMode } = useThemeUI()
  const isDarkMode = getIsDarkMode(colorMode)

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    ...props
  })

  return (
    <Fragment>
      <span ref={setTriggerRef} {...props}>
        {children}
      </span>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          sx={{
            border: theme => (isDarkMode ? `none` : theme.colors.gray[8]),
            ...(isDarkMode ? { color: `text` } : {})
          }}
        >
          {!hideArrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
          {tooltip}
        </div>
      )}
    </Fragment>
  )
}

export default Tooltip
