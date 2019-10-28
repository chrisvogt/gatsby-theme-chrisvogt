/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import useNavigationData from '../../hooks/use-navigation-data'

export default () => {
  const { footer: menuItems = [] } = useNavigationData()
  return (
    menuItems &&
    menuItems.map(({ slug, path, title, text }) => (
      <Styled.a key={slug} href={path} title={title} sx={{ mr: 3 }}>
        {text}
      </Styled.a>
    ))
  )
}
