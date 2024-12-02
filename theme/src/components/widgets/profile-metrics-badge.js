/** @jsx jsx */
import { Badge, jsx } from 'theme-ui'

const ProfileMetricsBadge = ({ isLoading, metrics = [] }) => (
  <div
    sx={{
      fontFamily: 'heading',
      mt: 2,
      pb: 4,
      pt: 1,
      display: 'flex',
      justifyContent: ['center', 'unset']
    }}
  >
    {(isLoading ? [{}, {}] : metrics).map(({ displayName, id, value }, idx) => (
      <Badge key={id || idx} variant='outline' ml={idx !== 0 && 2}>
        {value} {displayName}
      </Badge>
    ))}
  </div>
)

export default ProfileMetricsBadge
