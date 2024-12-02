/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Box, Card, Heading } from '@theme-ui/components'
import Placeholder from 'react-placeholder'
import { TextRow } from 'react-placeholder/lib/placeholders'

import CardFooter from '../card-footer'
import ViewExternal from '../view-external'

const LastPullRequest = ({ isLoading, pullRequest = {} }) => {
  const { number, repository: { name: repositoryName } = {}, title, url } = pullRequest

  return (
    <Box>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Last Pull Request
      </Heading>

      <Themed.a
        href={url}
        sx={{
          color: 'var(--theme-ui-colors-panel-text)',
          display: 'flex',
          '&:hover, &:focus': {
            textDecoration: 'none'
          }
        }}
      >
        <Card variant='actionCard'>
          <Placeholder
            color='#efefef'
            customPlaceholder={<TextRow color='#efefef' style={{ marginTop: 0, width: '100%' }} />}
            ready={!isLoading}
            rows={1}
            showLoadingAnimation
          >
            <span>
              {title} (<span sx={{ fontWeight: 600 }}>#{number}</span>) – in <em>{repositoryName}</em>
            </span>
          </Placeholder>

          <CardFooter customStyles={{ justifyContent: 'flex-end' }}>
            <Placeholder
              color='#efefef'
              customPlaceholder={<TextRow color='#efefef' style={{ marginTop: 0, width: '15px', height: '15px' }} />}
              ready={!isLoading}
              showLoadingAnimation
            >
              <ViewExternal platform='GitHub' />
            </Placeholder>
          </CardFooter>
        </Card>
      </Themed.a>
    </Box>
  )
}

export default LastPullRequest
