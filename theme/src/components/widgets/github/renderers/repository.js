/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../../card-footer'

const Repository = ({
  description,
  nameWithOwner,
  primaryLanguage,
  updatedAt
}) => (
  <div
    sx={{
      display: `flex`,
      flexDirection: `column`,
      height: `100%`
    }}
  >
    <Flex
      sx={{
        alignItems: `center`,
        mb: 2
      }}
    >
      <Flex sx={{ flexGrow: 1, flexDirection: `column`, alignSelf: `center` }}>
        <Heading as='h4' sx={{ pt: 0, pr: 3, pb: 0, mb: 1 }}>
          {nameWithOwner}
        </Heading>
        <span sx={{ color: `textMuted`, fontSize: 0, p: 0 }}>
          Updated {ago(new Date(updatedAt))}
        </span>
      </Flex>
    </Flex>

    <span sx={{ flexGrow: 1 }}>{description}</span>

    <CardFooter>
      <span>{primaryLanguage.name}</span>
      <span
        sx={{
          backgroundColor: primaryLanguage.color,
          ml: 2,
          mb: `2px`,
          width: `15px`,
          height: `15px`,
          borderRadius: `50%`
        }}
      ></span>
    </CardFooter>
  </div>
)

Repository.propTypes = {
  /** @prop {String} description The description of the repository. */
  description: PropTypes.string.isRequired,
  /** @prop {String} nameWithOwner The repository's name with owner. */
  nameWithOwner: PropTypes.string.isRequired,
  /** @prop {String} updatedAt Identifies the date and time when the object was last updated. ISO-8601 encoded. */
  updatedAt: PropTypes.string.isRequired
}

export default Repository
