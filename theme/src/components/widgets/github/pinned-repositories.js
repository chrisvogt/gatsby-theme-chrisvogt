/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Styled } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'

import { getGithubUsername } from '../../../selectors/metadata'
import getRepositories from '../../../api/github/get-repositories'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import RepositoryCard from './repository-card'

export default () => {
  const placeholderRepositories = Array(4).fill({ isLoading: true })
  const [repositories, setRepositories] = useState(placeholderRepositories)

  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)

  useEffect(() => {
    ;(async () => {
      const repositories = await getRepositories()
      setRepositories(repositories)
    })()
  }, [])

  return (
    <Box sx={{ marginBottom: 3 }}>
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
        {repositories.map((repository, index) => (
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
              isLoading={repositories.isLoading}
              lastUpdated={repository.updatedAt}
              repositoryURL={repository.url}
              name={repository.nameWithOwner}
            />
          </Styled.a>
        ))}
      </Styled.div>
      <p sx={{ textAlign: `right`, marginTop: 4 }}>
        <Styled.a
          title={`${githubUsername} on GitHub`}
          href={`https://www.github.com/${githubUsername}`}
          sx={{ fontFamily: `heading`, fontSize: 3 }}
        >
          View GitHub profile &raquo;
        </Styled.a>
      </p>
    </Box>
  )
}
