/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import PropTypes from 'prop-types'
import isDarkMode from '../../helpers/isDarkMode'

const widgetStyles = {
  mb: 4,
  pt: [0, 3, 4],
  pb: [0, 3, 4]
}

const Widget = ({ children, hasFatalError, id, styleOverrides = {} }) => {
  const { colorMode } = useThemeUI()
  const darkMode = isDarkMode(colorMode)

  return (
    <section
      sx={{
        ...widgetStyles,
        ...styleOverrides,
        ...(hasFatalError
          ? {
              position: `relative`
            }
          : {})
      }}
      {...(id ? { id } : {})}
    >
      {hasFatalError && (
        <div
          sx={{
            alignItems: `center`,
            bottom: 0,
            display: `flex`,
            justifyContent: `center`,
            left: 0,
            position: `absolute`,
            right: 0,
            top: 0
          }}
        >
          <div
            sx={{
              background: darkMode ? `#252e3c` : `white`,
              borderLeft: `2px solid red`,
              borderRight: `2px solid red`,
              borderRadius: `2px`,
              boxShadow: `xl`,
              py: 3,
              px: 4,
              zIndex: 480
            }}
          >
            <h4>Something went wrong</h4>
            <p>Failed to load this widget.</p>
          </div>
          <div
            sx={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: darkMode
                ? `radial-gradient(rgba(14.5,18,23.5,0.4) 20%, transparent 50%);`
                : `radial-gradient(rgba(255, 255, 255, 0.4) 20%, transparent 50%)`,
              position: `absolute`,
              zIndex: 470
            }}
          ></div>
        </div>
      )}
      {children}
    </section>
  )
}

Widget.propTypes = {
  /** The elements to render within the widget. */
  children: PropTypes.node.isRequired,
  /** An id added to the widget wrapper element. */
  id: PropTypes.string
}

export default Widget
