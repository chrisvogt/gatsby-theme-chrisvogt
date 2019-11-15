/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../card-footer'
import ViewExternal from '../view-external'

const stripHtmlElements = text => text.replace(/<[^>]+>/g, '')

const UserStatus = ({ isLoading, status, actorName }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { actionText, updated, link } = status

  const statusText = actionText && stripHtmlElements(actionText)

  return (
    <Box>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Status
      </Heading>

      <Styled.a
        href={link}
        sx={{
          display: `flex`,
          '&:hover, &:focus': {
            textDecoration: `none`
          }
        }}
      >
        <Card sx={{ variant: `styles.RepositoryCard` }}>
          <span>
            {actorName} {statusText}
            <em>– {ago(new Date(updated))}</em>
          </span>

          <CardFooter>
            <ViewExternal platform='Goodreads' />
          </CardFooter>
        </Card>
      </Styled.a>
    </Box>
  )
}

UserStatus.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The pull request on GitHub. */
  status: PropTypes.shape({
    actionText: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
}

export default UserStatus
