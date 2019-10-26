/** @jsx jsx */
import { jsx } from 'theme-ui'
import { darken, lighten } from '@theme-ui/color'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import ago from 's-ago'

import { defaultBoxShadow } from '../../../gatsby-plugin-theme-ui/styles'
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
      backgroundColor: darken(`primary`, 0.04),
      border: `2px solid white`,
      borderRadius: `2px`,
      color: `white`,
      marginBottom: [3, `inherit`],
      padding: 3,
      width: `100%`,
      '&:hover, &:focus': {
        backgroundColor: lighten(`primary`, 0.04),
        boxShadow: defaultBoxShadow,
        textDecoration: `none`,
        transition: `all .35s ease-in-out`
      }
    }}
  >
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
          <div
            sx={{
              display: `flex`,
              flexGrow: 1,
              height: `100%`
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
              <FontAwesomeIcon icon={faExternalLinkAlt} inverse />
            </span>
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
