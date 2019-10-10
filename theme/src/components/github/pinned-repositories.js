/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Styled } from 'theme-ui'

import getRepositories from '../../api/github/get-repositories'
import RepositoryCard from './repository-card'

export default () => {
  const placeholderRepositories = Array(4).fill({ isLoading: true })
  const [repositories, setRepositories] = useState(placeholderRepositories)

  useEffect(() => {
    ;(async () => {
      const repositories = await getRepositories()
      setRepositories(repositories)
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
          display: 'grid',
          gridAutoRows: '1fr',
          gridGap: '1rem',
          gridTemplateColumns: ['', '', 'repeat(2, 1fr)']
        }}
      >
        {repositories.map((repository, index) => {
          return (
            <RepositoryCard
              key={repository.name || index}
              avatarURL={repository.openGraphImageUrl}
              description={repository.description}
              isLoading={repositories.isLoading}
              lastUpdated={repository.updatedAt}
              repositoryURL={repository.url}
              name={repository.nameWithOwner}
            />
          )
        })}
      </Styled.div>
    </div>
  )
}
