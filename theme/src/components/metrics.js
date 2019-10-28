/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Metrics = ({ children, styles }) => (
  <div sx={{ backgroundColor: `colors.background` }}>
    <div
      sx={{
        py: 1,
        ...(styles ? styles : {})
      }}
    >
      <Container>
        <div>PAGES</div>
        <div>HOURS</div>
      </Container>
    </div>
  </div>
)

export default Metrics
