/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Styled } from 'theme-ui'

import getRepositories from '../../api/github/get-repositories'
import RepositoryCard from './repository-card'

export default () => {
  const placeholderRepositoryTemplate = { isLoading: true }
  const placeholderRepositories = Array(4).fill(placeholderRepositoryTemplate)

  const [repositories, setRepositories] = useState({
    isLoading: true,
    repositories: [placeholderRepositories]
  })

  useEffect(() => {
    ;(async () => {
      const repositories = await getRepositories()
      setRepositories({
        isLoading: false,
        repositories
      })
    })()
  }, [])

  return (
    <div sx={{ marginBottom: 3 }}>
      <Styled.h3
        sx={{
          color: 'white',
          marginBottom: '1rem'
        }}
      >
        Pinned Repositories
      </Styled.h3>
      <Styled.div
        sx={{
          display: ['block', 'grid'],
          gridAutoRows: '1fr',
          gridGap: '1rem',
          gridTemplateColumns: ['', '', 'repeat(2, 1fr)']
        }}
      >
        {repositories.repositories.map((repository, index) => (
          <RepositoryCard
            avatarURL={repository.openGraphImageUrl}
            description={repository.description}
            isLoading={repositories.isLoading}
            lastUpdated={repository.updatedAt}
            repositoryURL={repository.url}
            key={repository.name || index}
            name={repository.nameWithOwner}
          />
        ))}
      </Styled.div>
    </div>
  )
}
