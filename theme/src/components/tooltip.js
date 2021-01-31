/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import TooltipTrigger from 'react-popper-tooltip'
import getIsDarkMode from '../helpers/isDarkMode'
import 'react-popper-tooltip/dist/styles.css'

const Tooltip = ({ children, tooltip, hideArrow, ...props }) => {
  const { colorMode } = useThemeUI()
  const isDarkMode = getIsDarkMode(colorMode)
  return (
    <TooltipTrigger
      {...props}
      tooltip={({
        arrowRef,
        tooltipRef,
        getArrowProps,
        getTooltipProps,
        placement
      }) => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            className: 'tooltip-container'
          })}
          sx={{
            border: theme => (isDarkMode ? `none` : theme.colors.gray[8]),
            ...(isDarkMode ? { color: `text` } : {})
          }}
        >
          {!hideArrow && (
            <div
              {...getArrowProps({
                ref: arrowRef,
                className: 'tooltip-arrow',
                'data-placement': placement
              })}
            />
          )}
          {tooltip}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) => (
        <span
          {...getTriggerProps({
            ref: triggerRef,
            className: 'trigger'
          })}
        >
          {children}
        </span>
      )}
    </TooltipTrigger>
  )
}

export default Tooltip
