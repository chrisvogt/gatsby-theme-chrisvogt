/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'
import ago from 's-ago'

import RepositoryCardPlaceholder from './repository-card-placeholder'

const RepositoryCard = ({
  avatarURL,
  description,
  isLoading,
  lastUpdated,
  name,
  repositoryURL
}) => (
  <div
    sx={{
      backgroundColor: 'white',
      borderRadius: '2px',
      marginBottom: [3, 'inherit'],
      padding: 3
    }}
  >
    {isLoading && <RepositoryCardPlaceholder />}
    {!isLoading && (
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 2
          }}
        >
          {avatarURL && (
            <img
              alt='repository avatar'
              height='42'
              src={avatarURL}
              sx={{
                mr: 2
              }}
              width='42'
            />
          )}
          <div
            sx={{
              display: 'flex',
              flexGrow: 1,
              height: '100%'
            }}
          >
            {name}
          </div>
        </div>

        {lastUpdated && (
          <small sx={{ pt: 2, pb: 1 }}>
            Updated {ago(new Date(lastUpdated))}
          </small>
        )}

        {description}

        {repositoryURL && (
          <div
            sx={{
              alignItems: 'flex-end',
              display: 'flex',
              height: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <Styled.a
              sx={{ fontSize: 'small' }}
              title='View on GitHub'
              href={repositoryURL}
              target='_blank'
            >
              View on GitHub &raquo;
            </Styled.a>
          </div>
        )}
      </div>
    )}
  </div>
)

RepositoryCard.propTypes = {
  avatarURL: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  repositoryURL: PropTypes.string
}

export default RepositoryCard
