import get from 'lodash/get'

const PATHS = {
  baseURL: 'baseURL',
  description: 'description',
  imageURL: 'imageURL',
  githubUsername: 'social.github.username',
  twitterUsername: 'social.twitter.username',
  title: 'title',
  titleTemplate: 'titleTemplate'
}

export const getBaseURL = metadata => get(metadata, PATHS.baseURL)

export const getDescription = metadata => get(metadata, PATHS.description)

export const getImageURL = metadata => get(metadata, PATHS.imageURL)

export const getGithubUsername = metadata => get(metadata, PATHS.githubUsername)

export const getTwitterUsername = metadata =>
  get(metadata, PATHS.twitterUsername)

export const getTitle = metadata => get(metadata, PATHS.title)

export const getTitleTemplate = metadata => get(metadata, PATHS.titleTemplate)
