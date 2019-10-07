/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, Styled } from "theme-ui"

import Placeholder from "react-placeholder"

import getRepositories from "../../api/github/get-repositories"

import "react-placeholder/lib/reactPlaceholder.css"

const PlaceholderExamplePlaceholder = () => (
  <Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
)

export default () => {
  const [repositories, setRepositories] = useState({ repositories: [] })

  useEffect(() => {
    ;(async () => {
      const repositories = await getRepositories()
      setRepositories(repositories)
    })()
  }, [])

  return (
    <div>
      <Styled.h3>Pinned Repositories</Styled.h3>
      <ul>
        {!!repositories.length &&
          repositories.map(item => (
            <li key={item.nameWithOwner}>{item.nameWithOwner}</li>
          ))}
        <li>
          <div>
            <Placeholder
              showLoadingAnimation
              ready={false}
              type="media"
              rows={5}
            >
              <p>This is a Test.</p>
            </Placeholder>
          </div>
        </li>
        <li>
          <PlaceholderExamplePlaceholder />
        </li>
      </ul>
      <Styled.a>View repositories on GitHub</Styled.a>
    </div>
  )
}
