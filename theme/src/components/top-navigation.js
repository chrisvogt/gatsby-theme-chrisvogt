/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import useNavigationData from '../hooks/use-navigation-data'

export default () => {
  const { header: { left } = {} } = useNavigationData();
  return (
    <Styled.div
      sx={{
        backgroundColor: 'white',
        py: 2
      }}
    >
      <Styled.a>
        TEXT_BRAND
      </Styled.a>
      
      { left && left.map(item => (
        <Styled.a key={item.slug}>
          {item.text}{' '}
        </Styled.a>
      ) ) }
    </Styled.div> 
  )
}
