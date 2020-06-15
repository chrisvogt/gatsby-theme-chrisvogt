import {
  getAvatarURL,
  getBaseURL,
  getDescription,
  getGithubUsername,
  getGoodreadsUsername,
  getHeadline,
  getImageURL,
  getInstagramUsername,
  getLanguageCode,
  getSubhead,
  getTitle,
  getTitleTemplate,
  getTwitterUsername
} from './metadata'

const metadata = {
  avatarURL: 'https://cdn.fake-site.com/images/avatar.jpg',
  baseURL: 'https://www.fake-site.com/blog',
  title: 'My Cool Website',
  description: 'Personal blog for web developer and creative.',
  headline: 'My Site Headline',
  subhead: 'Just another GatsbyJS blog',
  languageCode: 'en',
  imageURL: 'https://cdn.fake-site.com/images/og-banner.jpg',
  titleTemplate: '%s | My Cool Website',
  social: {
    github: {
      username: 'fake-github-user'
    },
    goodreads: {
      username: '1234567'
    },
    instagram: {
      username: 'fake.instagram.user'
    },
    twitter: {
      username: '@fake-twitter-account'
    }
  }
}

describe('Metadata Selectors', () => {
  it('selects the avatar URL', () => {
    const result = getAvatarURL(metadata)
    expect(result).toEqual(metadata.avatarURL)
  })

  it('selects the site base URL', () => {
    const result = getBaseURL(metadata)
    expect(result).toEqual(metadata.baseURL)
  })

  it('selects the site open graph description', () => {
    const result = getDescription(metadata)
    expect(result).toEqual(metadata.description)
  })

  it('selects the github username', () => {
    const result = getGithubUsername(metadata)
    expect(result).toEqual(metadata.social.github.username)
  })

  it('selects the goodreads username', () => {
    const result = getGoodreadsUsername(metadata)
    expect(result).toEqual(metadata.social.goodreads.username)
  })

  it('selects the twitter username', () => {
    const result = getTwitterUsername(metadata)
    expect(result).toEqual(metadata.social.twitter.username)
  })

  it('selects the home page headline text', () => {
    const result = getHeadline(metadata)
    expect(result).toEqual(metadata.headline)
  })

  it('selects the home page subheadline text', () => {
    const result = getSubhead(metadata)
    expect(result).toEqual(metadata.subhead)
  })

  it('selects the open graph banner URL', () => {
    const result = getImageURL(metadata)
    expect(result).toEqual(metadata.imageURL)
  })

  it('selects the instagram username', () => {
    const result = getInstagramUsername(metadata)
    expect(result).toEqual(metadata.social.instagram.username)
  })

  it('selects the language code for the site', () => {
    const result = getLanguageCode(metadata)
    expect(result).toEqual(metadata.languageCode)
  })

  it('selects the default site document title', () => {
    const result = getTitle(metadata)
    expect(result).toEqual(metadata.title)
  })

  it('selects the site doc title template', () => {
    const result = getTitleTemplate(metadata)
    expect(result).toEqual(metadata.titleTemplate)
  })
})
