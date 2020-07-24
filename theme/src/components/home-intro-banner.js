/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button } from '@theme-ui/components'
import { useState } from 'react'

import Emoji from '../helpers/Emoji'

const HomeIntroBanner = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  const frames = [
    {
      id: 'introduction',
      className: 'slide-0',
      nextFrameIndex: 1
    },
    {
      id: 'in-a-nutshell',
      className: 'slide-2',
      nextFrameIndex: 0
    }
  ]

  const goToNextFrame = () => {
    const { nextFrameIndex } = frames[currentFrameIndex]
    setCurrentFrameIndex(nextFrameIndex)
  }

  return (
    <div sx={{ variant: 'styles.GradientBannerDark' }}>
      <div style={{ maxWidth: `80%` }}>
        <div
          className={`slide-0 ${currentFrameIndex === 0 && 'active-slide'}`}
          sx={{ variant: `styles.IntroExperienceSlide` }}
        >
          <h3>Hello there.</h3>
          <p>
            This site is my personal blog, photo gallery, and activity
            dashboard.
          </p>
          <p>
            If we don't know each other, hi! I'm Chris Vogt.{' '}
            <Emoji label='Hand waving emoji'>👋</Emoji>
          </p>
        </div>
        <div
          className={`slide-1 ${currentFrameIndex === 1 && 'active-slide'}`}
          sx={{ variant: `styles.IntroExperienceSlide` }}
        >
          <h3>Who am I?</h3>
          <div className='toggle'>Personal | Professional</div>
          <p>In a nutshell, I'm a person.</p>
        </div>
        <Button
          aria-label='Learn more'
          sx={{ mt: 2, cursor: `pointer` }}
          onClick={() => goToNextFrame()}
        >
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default HomeIntroBanner
