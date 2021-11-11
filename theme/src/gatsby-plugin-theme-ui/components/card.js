import { floatOnHover } from '../abstracts/shadows'

export const card = {
  backgroundColor: `white`,
  borderRadius: `3px`,
  boxShadow: `default`,
  color: `text`,
  flexGrow: 1,
  padding: 3,
  textDecoration: `none`
}

export const infoCard = {
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  boxShadow: `none`,
  color: 'var(--theme-ui-colors-panel-text)',
  span: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    padding: 2
  }
}

export const PostCard = {
  ...card,
  ...floatOnHover,
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  color: 'var(--theme-ui-colors-panel-text)',
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
