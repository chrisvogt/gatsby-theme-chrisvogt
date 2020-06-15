import {
  getHeaderLeftItems
} from './navigation'

const navigation = {
  header: {
    left: [{
      path: '/about-me',
      slug: '/about-me',
      text: 'About Me',
      title: 'About Me'
    }]
  }
}

describe('Metadata Selectors', () => {
  it('selects the avatar URL', () => {
    const result = getHeaderLeftItems(navigation)
    expect(result).toEqual(navigation.header.left)
  })
})
