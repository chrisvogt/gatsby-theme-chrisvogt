/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const creditLink = 'https://github.com/personal-site/blog'

const Link = (
  <Styled.a href={creditLink} title="@personal-site/blog">
    @personal-site/blog
  </Styled.a>
)

export default () => <span>Powered by {Link}.</span>
