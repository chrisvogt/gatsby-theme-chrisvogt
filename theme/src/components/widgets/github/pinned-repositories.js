/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Styled } from 'theme-ui'

import { defaultBoxShadow } from '../../../gatsby-plugin-theme-ui/styles'
import getRepositories from '../../../api/github/get-repositories'
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
            <Styled.a
              href={repository.url}
              sx={{
                display: `flex`,
                '&:hover, &:focus': {
                  boxShadow: defaultBoxShadow,
                  textDecoration: `none`,
                  transition: `all .35s ease-in-out`
                }
              }}
            >
              <RepositoryCard
                key={repository.name || index}
                avatarURL={repository.openGraphImageUrl}
                description={repository.description}
                isLoading={repositories.isLoading}
                lastUpdated={repository.updatedAt}
                repositoryURL={repository.url}
                name={repository.nameWithOwner}
              />
            </Styled.a>
          )
        })}
      </Styled.div>
      <p sx={{ textAlign: `right`, marginTop: 4 }}>
        <Styled.a sx={{ color: `white`, fontFamily: `heading`, fontSize: 3 }}>
          View GitHub profile &raquo;
        </Styled.a>
      </p>
    </div>
  )
}
