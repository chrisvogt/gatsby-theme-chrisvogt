/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading } from '@theme-ui/components'
import ago from 's-ago'

export default props => {
  console.log(props)
  const { avatarURL, name, lastUpdated, description, repositoryURL } = props

  return (
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
  )
}
