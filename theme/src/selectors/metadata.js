import get from 'lodash/get'

export const getAvatarURL = metadata => get(metadata, 'avatarURL')

export const getBaseURL = metadata => get(metadata, 'baseURL')

export const getDescription = metadata => get(metadata, 'description')

export const getFooterText = (metadata = {}) => metadata.footerText

export const getGithubWidgetDataSource = metadata =>
  get(metadata, 'social.github.widgetDataSource')

export const getGithubUsername = metadata =>
  get(metadata, 'social.github.username')

export const getGoodreadsWidgetDataSourceBooks = metadata =>
  get(metadata, 'social.goodreads.widgetDataSourceBooks')

export const getGoodreadsWidgetDataSourceProfile = metadata =>
  get(metadata, 'social.goodreads.widgetDataSourceProfile')

export const getGoodreadsUsername = metadata =>
  get(metadata, 'social.goodreads.username')

export const getHeadline = metadata => get(metadata, 'headline')

export const getImageURL = metadata => get(metadata, 'imageURL')

export const getInstagramWidgetDataSource = metadata =>
  get(metadata, 'social.instagram.widgetDataSource')

export const getInstagramUsername = metadata =>
  get(metadata, 'social.instagram.username')

export const getLanguageCode = metadata => get(metadata, 'languageCode')

export const getProfilesWidgetDataSourceMetas = metadata =>
  get(metadata, 'social.profiles.widgetDataSourceMetas')

export const getProfilesWidgetDataSourceProfiles = metadata =>
  get(metadata, 'social.profiles.widgetDataSourceProfiles')

export const getSpotifyWidgetDataSource = metadata =>
  get(metadata, 'social.spotify.widgetDataSource')

export const getSubhead = metadata => get(metadata, 'subhead')

export const getTitle = metadata => get(metadata, 'title')

export const getTitleTemplate = metadata => get(metadata, 'titleTemplate')

export const getTwitterUsername = metadata =>
  get(metadata, 'social.twitter.username')
