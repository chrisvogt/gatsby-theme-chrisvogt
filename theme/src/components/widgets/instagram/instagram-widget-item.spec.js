import React from 'react'
import renderer from 'react-test-renderer'
import InstagramWidgetItem from './instagram-widget-item'

describe('InstagramWidgetItem', () => {
  const props = {
    post: {
      id: '0123456789',
      comments: { count: { commentsCount: 5 } },
      images: {
        standard_resolution: {
          height: 100,
          width: 100,
          url: 'https://cdn.chrisvogt.me/images/fake-instagram-image.jpg'
        }
      },
      likes: { count: { likesCount: 12 } },
      link: 'https://instagram.com/fake-image-link',
      type: 'IMAGE'
    }
  }

  it('matches the snapshot', () => {
    const tree = renderer.create(<InstagramWidgetItem {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
