import { floatOnHover } from '../abstracts/shadows'

export const card = {
  backgroundColor: `white`,
  borderBottom: `1px solid white`,
  borderRadius: `3px`,
  boxShadow: `default`,
  color: `text`,
  flexGrow: 1,
  padding: 3,
  textDecoration: `none`
}

export const infoCard = {
  boxShadow: `none`,
  borderBottom: `1px solid #efefef`,
  borderLeftColor: `text`,
  borderLeft: `2px solid`,
  span: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    padding: 2
  }
}

export const PostCard = {
  ...card,
  ...floatOnHover,
  display: `flex`,
  height: `100%`,
  flexDirection: `column`,
  '.card-media': {
    mb: 2,
    height: `100%`,
    overflow: `hidden`
  },
  '.read-more-icon': {
    display: `inline`,
    transition: `all 250ms ease-in`,
    opacity: 0,
    paddingLeft: 0
  },
  '&:hover .read-more-icon': {
    opacity: 1,
    paddingLeft: `8px`
  }
}
