/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

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
              name={repository.nameWithOwner}
              repositoryURL={repository.url}
            />
          </Styled.a>
        ))}
      </Styled.div>
      <p sx={{ marginTop: 4, textAlign: `right` }}>
        <Styled.a
          href={`https://www.github.com/${githubUsername}`}
          sx={{ fontFamily: `heading`, fontSize: 3 }}
          title={`${githubUsername} on GitHub`}
        >
          View GitHub profile &raquo;
        </Styled.a>
      </p>
    </Box>
  )
}
