/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
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
        I'm a Senior Software Engineer at GoDaddy, working on intelligent customer dashboards and experiences that help people
        build and grow their small businesses and online presence. Outside of work, I live in San Francisco, and my
        hobbies include practicing piano and recording music, photography, traveling, and meeting and learning more
        about people.
      </Themed.p>
      <Themed.p>
        This website is a digital garden where I share my passions, projects, and learnings. This site is designed and
        built by me and is published open source to inspire and help others grow and learn with me.
      </Themed.p>
    </div>
  )
}

export default HomeHeaderContent
