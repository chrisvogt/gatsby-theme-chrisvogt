/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../../card-footer'
import ViewExternal from '../../view-external'

const Repository = ({ description, nameWithOwner, updatedAt }) => (
  <Flex
    sx={{
      flexDirection: `column`,
      height: `100%`
    }}
  >
    <Heading as='h4' sx={{ p: 0, mb: 2 }}>
      {nameWithOwner}
    </Heading>

    <span sx={{ flexGrow: 1, mb: 2 }}>{description}</span>

    <CardFooter>
      <span sx={{ fontSize: 0, p: 0 }}>Last updated {ago(new Date(updatedAt))}</span>
      <ViewExternal platform='GitHub' />
    </CardFooter>
  </Flex>
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
