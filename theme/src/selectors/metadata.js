import get from 'lodash/get'

export const getAvatarURL = metadata => get(metadata, 'avatarURL')

export const getBaseURL = metadata => get(metadata, 'baseURL')

export const getDescription = metadata => get(metadata, 'description')

export const getGithubUsername = metadata =>
  get(metadata, 'social.github.username')

export const getGoodreadsUsername = metadata =>
  get(metadata, 'social.goodreads.username')

export const getHeadline = metadata => get(metadata, 'headline')

export const getImageURL = metadata => get(metadata, 'imageURL')

export const getInstagramUsername = metadata =>
  get(metadata, 'social.instagram.username')

export const getLanguageCode = metadata => get(metadata, 'languageCode')

export const getSubhead = metadata => get(metadata, 'subhead')

export const getTitle = metadata => get(metadata, 'title')

export const getTitleTemplate = metadata => get(metadata, 'titleTemplate')

export const getTwitterUsername = metadata =>
  get(metadata, 'social.twitter.username')
