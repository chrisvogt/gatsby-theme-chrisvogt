/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../card-footer'
import ViewExternal from '../view-external'

const stripHtmlElements = text => text.replace(/<[^>]+>/g, '')

const getRatingStars = count => {
  const repeat = (char, n) =>
    Array(n)
      .fill(char)
      .join('')

  const rating = repeat('★', count) + repeat('☆', 5 - count)

  return rating
}

const mapStatusToTemplate = {
  review: ({ book, rating }) =>
    `rated ${book.title} ${rating} out of 5 stars: ${getRatingStars(rating)}.`,
  userstatus: ({ actionText }) => stripHtmlElements(actionText)
}

const UserStatus = ({ isLoading, status, actorName }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { link, type, updated } = status

  const statusText = mapStatusToTemplate[type]
    ? mapStatusToTemplate[type](status)
    : 'Loading...'

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
  /** The name of the person the status is about. */
  actorName: PropTypes.string,
  /** Widget is in a loading state if true. */
  isLoading: PropTypes.bool,
  /** The Goodreads user status object. */
  status: PropTypes.shape({
    actionText: PropTypes.string,
    updated: PropTypes.string,
    link: PropTypes.string
  })
}

export default UserStatus
