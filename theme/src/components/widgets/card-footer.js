/** @jsx jsx */
import { jsx } from 'theme-ui'

const CardFooter = ({ children, customStyles }) => (
  <div
    sx={{
      variant: `styles.GitHubCardFooter`,
      color: `textMuted`,
      fontFamily: `sans`,
      fontSize: 1,
      ...(typeof customStyles === 'object' ? customStyles : {})
    }}
  >
    {children}
  </div>
)

export default CardFooter
