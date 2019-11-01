/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'

const MetricCard = ({ metric, title, value }) => (
  <Card sx={{ variant: `styles.MetricCard`, p: 2 }}>
    {title}
    <span>{value}</span>
  </Card>
)

export default MetricCard
