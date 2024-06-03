/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Box, Card, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'
import Placeholder from 'react-placeholder'
import { TextRow } from 'react-placeholder/lib/placeholders'

import CardFooter from '../card-footer'
import ViewExternal from '../view-external'

const stripHtmlElements = text => text.replace(/<[^>]+>/g, '')

const renderStarsForRating = count => {
  const repeat = (char, n) => Array(n).fill(char).join('')
  const rating = repeat('★', count) + repeat('☆', 5 - count)
  return rating
}

const mapStatusToTemplate = {
  review: ({ book, rating }) => `rated ${book.title} ${rating} out of 5 stars: ${renderStarsForRating(rating)}.`,
  userstatus: ({ actionText }) => stripHtmlElements(actionText)
}

const UserStatus = ({ isLoading, status, actorName }) => {
  const { link, type, updated } = status

  const statusText = mapStatusToTemplate[type] ? mapStatusToTemplate[type](status) : 'Loading...'

  return (
    <Box>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Status
      </Heading>

      <Themed.a
        href={link}
        sx={{
          color: `var(--theme-ui-colors-panel-text)`,
          display: `flex`,
          '&:hover, &:focus': {
            textDecoration: `none`
          }
        }}
      >
        <Card variant='actionCard'>
          <Placeholder
            color='#efefef'
            customPlaceholder={<TextRow style={{ marginTop: 0, width: `100%` }} />}
            ready={!isLoading}
            showLoadingAnimation
          >
            <span>
              {actorName} {statusText}
              <em>– {ago(new Date(updated))}</em>
            </span>
          </Placeholder>
          <CardFooter customStyles={{ justifyContent: `flex-end` }}>
            <Placeholder
              color='#efefef'
              customPlaceholder={<TextRow style={{ marginTop: 0, width: `140px` }} />}
              ready={!isLoading}
              showLoadingAnimation
            >
              <ViewExternal platform='Goodreads' />
            </Placeholder>
          </CardFooter>
        </Card>
      </Themed.a>
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
