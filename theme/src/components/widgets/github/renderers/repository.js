/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../../card-footer'
import ViewExternal from '../../view-external'

const Repository = ({
  description,
  nameWithOwner,
  openGraphImageUrl,
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
      <Flex sx={{ flexDirection: `column`, alignItems: `center` }}>
        <img
          alt='repository avatar'
          height='42'
          src={openGraphImageUrl}
          sx={{
            backgroundColor: `colors.background`,
            borderRadius: `3px`
          }}
          width='42'
        />
      </Flex>
      <Flex sx={{ flexDirection: `column`, alignSelf: `center`, pl: 3 }}>
        <Heading as='h4' sx={{ p: 0, mb: 0 }}>
          {nameWithOwner}
        </Heading>
        <span sx={{ color: `textMuted`, fontSize: 0, p: 0 }}>
          Updated {ago(new Date(updatedAt))}
        </span>
      </Flex>
    </Flex>

    <span sx={{ flexGrow: 1 }}>{description}</span>

    <CardFooter>
      <ViewExternal platform='GitHub' />
    </CardFooter>
  </div>
)

Repository.propTypes = {
  /** @prop {String} description The description of the repository. */
  description: PropTypes.string.isRequired,
  /** @prop {String} nameWithOwner The repository's name with owner. */
  nameWithOwner: PropTypes.string.isRequired,
  /** @prop {String} openGraphImageUrl The image used to represent this repository in Open Graph data. */
  openGraphImageUrl: PropTypes.string.isRequired,
  /** @prop {String} updatedAt Identifies the date and time when the object was last updated. ISO-8601 encoded. */
  updatedAt: PropTypes.string.isRequired
}

export default Repository
