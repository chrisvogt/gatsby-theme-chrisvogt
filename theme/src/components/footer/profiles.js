/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faBehance,
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

import {
  getProfilesWidgetDataSourceMetas,
  getProfilesWidgetDataSourceProfiles
} from '../../selectors/metadata'

import useDataSource from '../../hooks/use-data-source'
import useSiteMetadata from '../../hooks/use-site-metadata'

/**
 * icons is a library containing all of the social icons available for this theme.
 * This is to prevent the entire font awesome library from being included in the
 * bundle. See chrisvogt/gatsby-theme-private-sphere#31 for to learn more.
 */
const icons = {
  faBehance,
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter
}

const isEmptyObject = obj => Object.entries(obj).length === 0

// NOTE(cvogt): this function is leftover from an old hook that handled all profiles
// logic, but was hard-coded to call specific, old APIs that I neither use nor
// maintain. The selection statements below can and should be factored out once
// those APIs are replaced.
const sortAndFilterProfiles = (profilesResponse = {}, metasResponse = {}) => {
  if (isEmptyObject(profilesResponse) && isEmptyObject(metasResponse)) {
    return []
  }

  const { result: { profiles = [] } = {} } = profilesResponse
  const { result: { metas = [] } = {} } = metasResponse

  const { order } = metas.find(meta => meta.key === 'socialProfilesOrder') || {}

  if (!order) {
    return profiles
  }

  const sortedProfiles = order
    .map((meta, index) => profiles[index])
    .filter(Boolean)

  return sortedProfiles
}

/** Mapper function to attach React icon components to profile data. */
const profilesToIcons = profile => {
  const { icon: { reactIcon } = {} } = profile
  return {
    IconComponent: icons[reactIcon],
    profile
  }
}

export default () => {
  const metadata = useSiteMetadata()

  const metasDataSource = getProfilesWidgetDataSourceMetas(metadata)
  const profilesDataSource = getProfilesWidgetDataSourceProfiles(metadata)

  const { isLoading: isLoadingProfiles, data: profiles } = useDataSource(
    profilesDataSource
  )
  const { isLoading: isLoadingMetas, data: metas } = useDataSource(
    metasDataSource
  )

  // NOTE(cvogt): for now, both the profiles and the metas requests must complete
  // before this widget is considered "ready". This is because profiles are returned
  // unsorted, and metas define the order to render profiles in.
  const isLoading = isLoadingProfiles || isLoadingMetas

  const sortedProfiles =
    !isLoading && sortAndFilterProfiles(profiles, metas).map(profilesToIcons)

  return (
    <Fragment>
      <h4 sx={{ mb: 4 }}>My social profiles</h4>

      {!isLoading &&
        sortedProfiles.map(({ IconComponent, profile = {} }) => {
          const { displayName, href, slug } = profile
          return (
            <a
              key={slug}
              href={href}
              title={displayName}
              rel='me'
              sx={{ mx: [3, 4, 4, 5] }}
            >
              <FontAwesomeIcon
                icon={IconComponent}
                sx={{ fontSize: [4, 5, 6] }}
              />
            </a>
          )
        })}
    </Fragment>
  )
}
