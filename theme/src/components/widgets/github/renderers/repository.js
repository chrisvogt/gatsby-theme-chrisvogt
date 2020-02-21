/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex, Heading } from '@theme-ui/components'
import ago from 's-ago'
import PropTypes from 'prop-types'

import CardFooter from '../../card-footer'
import LazyLoad from '../../../lazy-load'
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
        fontSize: 2,
        mb: 2
      }}
    >
      <Flex sx={{ flexDirection: `column`, alignItems: `center` }}>
        <LazyLoad>
          <img
            alt='repository avatar'
            height='42'
            src={openGraphImageUrl}
            sx={{
              backgroundColor: `colors.background`,
              border: `2px solid white`,
              borderRadius: `4px`,
              mr: 2
            }}
            width='42'
          />
        </LazyLoad>
      </Flex>
      <Flex sx={{ flexDirection: `column`, alignSelf: `center` }}>
        <Heading as='h5' sx={{ p: 0, mb: 0 }}>
          {nameWithOwner}
        </Heading>
        <span sx={{ fontSize: `small`, p: 0 }}>
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
