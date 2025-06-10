/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { useRef } from 'react'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background and below the top nav.
 */
const HomeHeaderContent = () => {
  const emojiRef = useRef(null)

  const handleMouseEnter = () => {
    if (emojiRef.current) {
      emojiRef.current.style.animation = 'wobble 1s ease-in-out'
    }
  }

  const handleAnimationEnd = () => {
    if (emojiRef.current) {
      emojiRef.current.style.animation = 'none'
    }
  }

  return (
    <div
      sx={{
        lineHeight: '2.5em',
        mb: 5
      }}
    >
      <Themed.h1
        onMouseEnter={handleMouseEnter}
        sx={{
          mb: 0,
          pb: 0,
          fontSize: 'calc(1.5rem + 2vw)',
          '.emoji': {
            display: 'inline-block'
          }
        }}
      >
        Hi!{' '}
        <span className='emoji' ref={emojiRef} onAnimationEnd={handleAnimationEnd}>
          👋
        </span>{' '}
        I'm Chris Vogt.
      </Themed.h1>

      <Themed.p>
        This is my personal blog and digital garden: a place where I share what I’m building, exploring, and learning
        over time.
      </Themed.p>

      <Themed.p>
        By day, I work as a software engineer at GoDaddy, creating tools that help small businesses build, grow, and
        understand their online presence. But this site isn’t about work — it’s where I follow my curiosity, experiment
        with ideas, and write code just for fun.
      </Themed.p>

      <Themed.p>
        Most evenings, you’ll find me at the piano — practicing, recording, or just playing around with sound. I’ve been
        slowly teaching myself music, and I’m figuring out how to bring what I know from tech into making music. I also
        spend a lot of time with friends in the city and love connecting with people who are passionate about what they
        do.
      </Themed.p>

      <Themed.p>
        This space is always evolving — part notebook, part playground — and I’m glad you found your way here.
      </Themed.p>
    </div>
  )
}

export default HomeHeaderContent
