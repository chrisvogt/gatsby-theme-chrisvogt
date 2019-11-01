/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Heading } from '@theme-ui/components'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'gatsby'

export default ({ isLoading, pullRequest }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { number, repository: { name } = {}, title, url } = pullRequest
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
          {title} (<span sx={{ color: `textMuted` }}>#{number}</span>) – in{' '}
          <em>{name}</em>
          {url && (
            <p
              sx={{
                fontSize: `small`,
                textAlign: `right`
              }}
            >
              View on GitHub&nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </p>
          )}
        </Card>
      </Styled.a>
    </Box>
  )
}
