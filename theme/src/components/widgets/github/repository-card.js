/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  <Card sx={{ variant: `styles.RepositoryCard` }}>
    {isLoading && <RepositoryCardPlaceholder />}
    {!isLoading && (
      <div
        sx={{
          display: `flex`,
          flexDirection: `column`,
          height: `100%`
        }}
      >
        <div
          sx={{
            alignItems: `center`,
            display: `flex`,
            fontSize: 2
          }}
        >
          {avatarURL && (
            <img
              alt='repository avatar'
              height='42'
              src={avatarURL}
              sx={{
                backgroundColor: `colors.background`,
                border: `2px solid white`,
                borderRadius: `50%`,
                mr: 2
              }}
              width='42'
            />
          )}
          <Heading as='h5'>{name}</Heading>
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
              alignItems: `flex-end`,
              display: `flex`,
              height: `100%`,
              justifyContent: `flex-end`
            }}
          >
            <span
              sx={{ fontSize: `small` }}
              title='View on GitHub'
              href={repositoryURL}
              target='_blank'
            >
              View on GitHub&nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </span>
          </div>
        )}
      </div>
    )}
  </Card>
)

RepositoryCard.propTypes = {
  avatarURL: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  repositoryURL: PropTypes.string
}

export default RepositoryCard
