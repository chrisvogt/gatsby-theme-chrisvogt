import get from 'lodash/get'

const PATHS = {
  baseURL: 'baseURL',
  description: 'description',
  githubUsername: 'social.github.username',
  headline: 'headline',
  imageURL: 'imageURL',
  instagramUsername: 'social.instagram.username',
  subhead: 'subhead',
  title: 'title',
  titleTemplate: 'titleTemplate',
  twitterUsername: 'social.twitter.username'
}

export const getBaseURL = metadata => get(metadata, PATHS.baseURL)

export const getDescription = metadata => get(metadata, PATHS.description)

export const getGithubUsername = metadata => get(metadata, PATHS.githubUsername)

export const getHeadline = metadata => get(metadata, PATHS.headline)

export const getImageURL = metadata => get(metadata, PATHS.imageURL)

export const getInstagramUsername = metadata =>
  get(metadata, PATHS.instagramUsername)

export const getSubhead = metadata => get(metadata, PATHS.subhead)

export const getTitle = metadata => get(metadata, PATHS.title)

export const getTitleTemplate = metadata => get(metadata, PATHS.titleTemplate)

export const getTwitterUsername = metadata =>
  get(metadata, PATHS.twitterUsername)
