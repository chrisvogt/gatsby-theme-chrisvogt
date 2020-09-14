import get from 'lodash/get'

export const getAvatarURL = metadata => get(metadata, 'avatarURL')

export const getBaseURL = metadata => get(metadata, 'baseURL')

export const getDescription = metadata => get(metadata, 'description')

export const getFooterText = (metadata = {}) => metadata.footerText

export const getGithubUsername = metadata =>
  get(metadata, 'widgets.github.username')

export const getGithubWidgetDataSource = metadata =>
  get(metadata, 'widgets.github.widgetDataSource')

export const getGoodreadsUsername = metadata =>
  get(metadata, 'widgets.goodreads.username')

export const getGoodreadsWidgetDataSource = metadata =>
  get(metadata, 'widgets.goodreads.widgetDataSource')

export const getHeadline = metadata => get(metadata, 'headline')

export const getImageURL = metadata => get(metadata, 'imageURL')

export const getInstagramWidgetDataSource = metadata =>
  get(metadata, 'widgets.instagram.widgetDataSource')

export const getInstagramUsername = metadata =>
  get(metadata, 'widgets.instagram.username')

export const getLanguageCode = metadata => get(metadata, 'languageCode')

export const getProfilesWidgetDataSourceMetas = metadata =>
  get(metadata, 'widgets.profiles.widgetDataSourceMetas')

export const getProfilesWidgetDataSourceProfiles = metadata =>
  get(metadata, 'widgets.profiles.widgetDataSourceProfiles')

export const getSpotifyWidgetDataSource = metadata =>
  get(metadata, 'widgets.spotify.widgetDataSource')

export const getSubhead = metadata => get(metadata, 'subhead')

export const getTitle = metadata => get(metadata, 'title')

export const getTitleTemplate = metadata => get(metadata, 'titleTemplate')

export const getTwitterUsername = metadata =>
  get(metadata, 'widgets.twitter.username')
