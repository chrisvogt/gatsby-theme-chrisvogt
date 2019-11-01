/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'

export default ({ user }) => {
  console.log(user)
  return (
    <Card>
      Name: <pre>{user.name}</pre>
      Location: <pre>{user.location}</pre>
      {/* Status: <pre>{JSON.stringify(user.status)}</pre> */}
      Avatar: <img src={user.avatarURL} width='150' />
    </Card>
  )
}
