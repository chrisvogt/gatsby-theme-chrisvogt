/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import CardFooter from '../card-footer'
import ViewExternal from '../view-external'

const LastPullRequest = ({ isLoading, pullRequest }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const {
    number,
    repository: { name: repositoryName } = {},
    title,
    url
  } = pullRequest

  return (
    <Box>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Last Pull Request
      </Heading>

      <Styled.a
        href={url}
        sx={{
          display: `flex`,
          '&:hover, &:focus': {
            textDecoration: `none`
          }
        }}
      >
        <Card sx={{ variant: `styles.RepositoryCard` }}>
          <span>
            {title} (
            <span sx={{ color: `dark`, fontWeight: 600 }}>#{number}</span>) – in{' '}
            <em>{repositoryName}</em>
          </span>

          <CardFooter>
            <ViewExternal platform='GitHub' />
          </CardFooter>
        </Card>
      </Styled.a>
    </Box>
  )
}

LastPullRequest.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The pull request on GitHub. */
  pullRequest: PropTypes.shape({
    /** The # of the pull request on GitHub. */
    number: PropTypes.number,
    repository: PropTypes.shape({
      /** The name of the subject repository. */
      name: PropTypes.string
    }),
    /** The pull request content to render. */
    title: PropTypes.string,
    /** The URL to hyperlink to. */
    url: PropTypes.string
  })
}

export default LastPullRequest
