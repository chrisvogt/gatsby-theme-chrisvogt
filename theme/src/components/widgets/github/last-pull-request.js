/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import CardFooter from './card-footer'
import ViewOnGitHub from './view-on-github'

const LastPullRequest = ({ isLoading, number, repositoryName, title, url }) => {
  if (isLoading) {
    return 'Loading...'
  }

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
            <ViewOnGitHub />
          </CardFooter>
        </Card>
      </Styled.a>
    </Box>
  )
}

LastPullRequest.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The # of the pull request on GitHub. */
  number: PropTypes.number,
  /** The name of the subject repository. */
  repositoryName: PropTypes.string,
  /** The pull request content to render. */
  title: PropTypes.string,
  /** The URL to hyperlink to. */
  url: PropTypes.string
}

export default LastPullRequest
