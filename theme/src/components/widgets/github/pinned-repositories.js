/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import RepositoryCard from './repository-card'

export default ({ isLoading, pinnedRepositories = [] }) => {
  const placeholderRepositories = Array(4).fill({ isLoading: true })
  const repositories = isLoading ? placeholderRepositories : pinnedRepositories

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Pinned Repositories
      </Heading>
      <Styled.div
        sx={{
          display: 'grid',
          gridAutoRows: '1fr',
          gridGap: '1rem',
          gridTemplateColumns: ['', '', 'repeat(2, 1fr)']
        }}
      >
        {repositories &&
          repositories.map((repository, index) => (
            <Styled.a
              href={repository.url}
              key={repository.name || index}
              sx={{
                display: `flex`,
                '&:hover, &:focus': {
                  textDecoration: `none`
                }
              }}
            >
              <RepositoryCard
                avatarURL={repository.openGraphImageUrl}
                description={repository.description}
                isLoading={isLoading}
                lastUpdated={repository.updatedAt}
                name={repository.nameWithOwner}
                repositoryURL={repository.url}
              />
            </Styled.a>
          ))}
      </Styled.div>
    </Box>
  )
}
