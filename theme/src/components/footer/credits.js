/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

export default () => (
  <Fragment>
    Made in San Francisco{' '}
    <span sx={{ fontFamily: `mono`, fontSize: `small` }}>
      (
      <a
        href='https://github.com/chrisvogt/gatsby-theme-private-sphere'
        title='View source on GitHub'
      >
        View Source
      </a>
      )
    </span>
  </Fragment>
)
