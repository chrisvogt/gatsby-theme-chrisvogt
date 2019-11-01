/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

const StatusCard = ({ message }) => (
  <Card sx={{ variant: `styles.MetricCard`, mb: 3 }}>{message}</Card>
)

export default StatusCard
